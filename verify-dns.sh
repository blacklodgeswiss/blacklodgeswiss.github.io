#!/usr/bin/env bash

# DNS Verification Script for blacklodge.ch
# This script checks if DNS records are properly configured for GitHub Pages

set -euo pipefail

DOMAIN="blacklodge.ch"
WWW_DOMAIN="www.blacklodge.ch"
GITHUB_PAGES_DOMAIN="blacklodgeswiss.github.io"

# GitHub Pages IP addresses
GITHUB_IPS=(
    "185.199.108.153"
    "185.199.109.153"
    "185.199.110.153"
    "185.199.111.153"
)

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "======================================"
echo "DNS Verification for blacklodge.ch"
echo "======================================"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required commands
if ! command_exists dig && ! command_exists nslookup; then
    echo -e "${RED}Error: Neither 'dig' nor 'nslookup' command found.${NC}"
    echo "Please install dnsutils (Debian/Ubuntu) or bind-tools (RedHat/CentOS)"
    exit 1
fi

echo -e "${BLUE}Checking DNS records for ${DOMAIN}...${NC}"
echo ""

# Check A records for root domain
echo "1. Checking A records for ${DOMAIN}:"
if command_exists dig; then
    A_RECORDS=$(dig +short "$DOMAIN" A 2>/dev/null || echo "")
else
    A_RECORDS=$(nslookup "$DOMAIN" 2>/dev/null | grep 'Address:' | grep -v '#' | awk '{print $2}' || echo "")
fi

A_RECORDS_VALID=false
if [ -z "$A_RECORDS" ]; then
    echo -e "${RED}✗ No A records found for ${DOMAIN}${NC}"
    echo -e "${YELLOW}  Action required: Configure A records with GitHub Pages IPs${NC}"
else
    echo -e "${GREEN}✓ Found A records:${NC}"
    VALID_COUNT=0
    while IFS= read -r ip; do
        if [ -n "$ip" ] && [[ " ${GITHUB_IPS[*]} " =~ " ${ip} " ]]; then
            echo -e "${GREEN}  ✓ ${ip} (GitHub Pages IP)${NC}"
            VALID_COUNT=$((VALID_COUNT + 1))
        elif [ -n "$ip" ]; then
            echo -e "${YELLOW}  ⚠ ${ip} (Not a GitHub Pages IP)${NC}"
        fi
    done <<< "$A_RECORDS"
    
    if [ "$VALID_COUNT" -gt 0 ]; then
        A_RECORDS_VALID=true
    fi
fi
echo ""

# Check CNAME record for www subdomain
echo "2. Checking CNAME record for ${WWW_DOMAIN}:"
CNAME_VALID=false
if command_exists dig; then
    CNAME_RECORD=$(dig +short "$WWW_DOMAIN" CNAME 2>/dev/null || echo "")
else
    CNAME_RECORD=$(nslookup -type=CNAME "$WWW_DOMAIN" 2>/dev/null | grep 'canonical name' | awk '{print $NF}' | sed 's/\.$//' || echo "")
fi

if [ -z "$CNAME_RECORD" ]; then
    echo -e "${RED}✗ No CNAME record found for ${WWW_DOMAIN}${NC}"
    echo -e "${YELLOW}  Action required: Configure CNAME record pointing to ${GITHUB_PAGES_DOMAIN}${NC}"
else
    if [ "$CNAME_RECORD" = "$GITHUB_PAGES_DOMAIN." ] || [ "$CNAME_RECORD" = "$GITHUB_PAGES_DOMAIN" ]; then
        echo -e "${GREEN}✓ CNAME record correctly configured: ${CNAME_RECORD}${NC}"
        CNAME_VALID=true
    else
        echo -e "${YELLOW}⚠ CNAME record found but incorrect: ${CNAME_RECORD}${NC}"
        echo -e "${YELLOW}  Expected: ${GITHUB_PAGES_DOMAIN}${NC}"
    fi
fi
echo ""

# Check if domain resolves
echo "3. Checking domain resolution:"
if command_exists curl; then
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-redirs 5 "https://${DOMAIN}" --max-time 30 2>/dev/null || echo "000")
    
    if [ "$HTTP_STATUS" = "000" ]; then
        echo -e "${RED}✗ Cannot connect to https://${DOMAIN}${NC}"
        echo -e "${YELLOW}  This is expected if DNS is not yet configured or propagated${NC}"
    elif [ "$HTTP_STATUS" = "200" ]; then
        echo -e "${GREEN}✓ Website is accessible at https://${DOMAIN} (HTTP ${HTTP_STATUS})${NC}"
    elif [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
        echo -e "${GREEN}✓ Website redirects properly (HTTP ${HTTP_STATUS})${NC}"
    elif [ "$HTTP_STATUS" = "404" ]; then
        echo -e "${YELLOW}⚠ Domain resolves but shows 404 error${NC}"
        echo -e "${YELLOW}  Check GitHub Pages configuration${NC}"
    else
        echo -e "${YELLOW}⚠ Website responds with HTTP ${HTTP_STATUS}${NC}"
    fi
else
    echo -e "${YELLOW}⚠ curl not found, skipping HTTP check${NC}"
fi
echo ""

# Final summary
echo "======================================"
echo "Summary:"
echo "======================================"

if [ "$A_RECORDS_VALID" = true ] && [ "$CNAME_VALID" = true ]; then
    echo -e "${GREEN}✓ DNS records are correctly configured${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Wait for DNS propagation (can take 5 minutes to 48 hours)"
    echo "2. Enable HTTPS in GitHub Pages settings"
    echo "3. Test website: https://${DOMAIN}"
elif [ "$A_RECORDS_VALID" = false ] && [ "$CNAME_VALID" = false ]; then
    echo -e "${RED}✗ DNS records are NOT configured${NC}"
    echo ""
    echo "Required actions:"
    echo "1. Configure A records for ${DOMAIN} pointing to GitHub Pages IPs"
    echo "2. Configure CNAME record for ${WWW_DOMAIN} pointing to ${GITHUB_PAGES_DOMAIN}"
    echo "3. See DNS-SETUP-GUIDE.md for detailed instructions"
else
    echo -e "${YELLOW}⚠ DNS configuration is incomplete${NC}"
    echo ""
    if [ "$A_RECORDS_VALID" = false ]; then
        echo "Missing or incorrect: A records for ${DOMAIN}"
    fi
    if [ "$CNAME_VALID" = false ]; then
        echo "Missing or incorrect: CNAME record for ${WWW_DOMAIN}"
    fi
    echo ""
    echo "Please review the checks above and configure missing DNS records"
    echo "See DNS-SETUP-GUIDE.md for detailed instructions"
fi

echo ""
echo "For detailed setup instructions, see: DNS-SETUP-GUIDE.md"
echo "======================================"
