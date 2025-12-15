# Website Troubleshooting Guide

## Issue: "Die Website ist nicht erreichbar" (Website Not Accessible)

### Error Message
```
Die Website ist nicht erreichbar
Prüfe, ob „blacklodge.ch" einen Tippfehler enthält.
DNS_PROBE_FINISHED_NXDOMAIN
```

### Problem Description
This error occurs when the DNS (Domain Name System) cannot find the domain `blacklodge.ch`. This means the domain is either:
1. Not registered
2. Registered but DNS records are not configured
3. DNS records are configured incorrectly

### Solution

#### Step 1: Verify Your Setup
Run the DNS verification script to check current status:
```bash
./verify-dns.sh
```

#### Step 2: Configure DNS Records
Your domain `blacklodge.ch` needs to be configured with proper DNS records. Follow the detailed guide:

**📖 [See DNS Setup Guide →](./DNS-SETUP-GUIDE.md)**

#### Step 3: Wait for DNS Propagation
After configuring DNS records:
- Changes can take 5 minutes to 48 hours to propagate
- Most changes propagate within 1-2 hours
- You can check propagation status at: https://dnschecker.org

#### Step 4: Enable HTTPS
Once DNS is working:
1. Go to GitHub repository Settings
2. Navigate to Pages section
3. Enable "Enforce HTTPS"
4. Wait up to 24 hours for SSL certificate provisioning

### Quick Checks

#### ✅ What's Working:
- ✓ GitHub Pages deployment is successful
- ✓ GitHub Actions workflow is running correctly  
- ✓ CNAME file is properly configured
- ✓ Repository is public and accessible

#### ❌ What Needs Fixing:
- ✗ DNS A records for `blacklodge.ch` are not configured
- ✗ DNS CNAME record for `www.blacklodge.ch` is not configured

### Required DNS Configuration

You need to add these DNS records at your domain registrar:

**For root domain (blacklodge.ch):**
```
Type: A
Name: @ (or blank)
Value: 185.199.108.153

Type: A
Name: @ (or blank)
Value: 185.199.109.153

Type: A
Name: @ (or blank)
Value: 185.199.110.153

Type: A  
Name: @ (or blank)
Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: blacklodgeswiss.github.io
```

### Common Questions

#### Q: Where do I configure DNS records?
**A:** At your domain registrar where you purchased `blacklodge.ch` (e.g., GoDaddy, Namecheap, Infomaniak, Hostpoint, etc.)

#### Q: How long until my website works?
**A:** After configuring DNS records:
- DNS propagation: 5 minutes to 48 hours (usually 1-2 hours)
- SSL certificate: Up to 24 hours after DNS is working

#### Q: Can I use the website before configuring DNS?
**A:** Unfortunately no. The custom domain `blacklodge.ch` requires DNS configuration to work. The GitHub Pages default URL (`blacklodgeswiss.github.io`) is overridden by the CNAME file.

#### Q: What if I don't have access to the domain registrar?
**A:** You need access to the domain registrar to configure DNS. Contact the domain owner or registrar support for assistance.

### Testing Your Configuration

After configuring DNS, you can test using:

**Command line:**
```bash
# Check DNS records
nslookup blacklodge.ch
nslookup www.blacklodge.ch

# Check website accessibility
curl -I https://blacklodge.ch
```

**Online tools:**
- DNS propagation: https://dnschecker.org
- DNS records: https://www.whatsmydns.net  
- SSL certificate: https://www.ssllabs.com/ssltest/

### Need Help?

1. **Read the detailed guide:** [DNS-SETUP-GUIDE.md](./DNS-SETUP-GUIDE.md)
2. **Run verification script:** `./verify-dns.sh`
3. **Check DNS propagation:** https://dnschecker.org
4. **Review GitHub Pages docs:** https://docs.github.com/en/pages

### Contact Domain Registrar

If you're unsure how to configure DNS records, contact your domain registrar's support with this information:

```
I need to configure DNS records for my domain to point to GitHub Pages:

Domain: blacklodge.ch

Required A records:
- 185.199.108.153
- 185.199.109.153  
- 185.199.110.153
- 185.199.111.153

Required CNAME record:
- www.blacklodge.ch → blacklodgeswiss.github.io

Purpose: GitHub Pages custom domain configuration
```

---

**Last Updated:** 2025-12-15  
**Status:** DNS records need to be configured at domain registrar
