# DNS Setup Guide for blacklodge.ch

## Current Issue
The website **blacklodge.ch** is not accessible due to missing or incorrect DNS configuration. The error `DNS_PROBE_FINISHED_NXDOMAIN` indicates that DNS records are not properly configured.

## Problem Diagnosis
✅ **Working:**
- GitHub Pages deployment is successful
- GitHub Actions workflow is running correctly
- CNAME file is configured with `blacklodge.ch`
- Repository is public

❌ **Not Working:**
- DNS records for `blacklodge.ch` are not configured
- Domain does not resolve to GitHub Pages servers

## Solution: Configure DNS Records

You need to configure DNS records at your domain registrar (where you purchased `blacklodge.ch`).

### Option 1: CNAME Record (Recommended)
Configure a `CNAME` record for `www.blacklodge.ch`:

```
Type:  CNAME
Name:  www
Value: blacklodgeswiss.github.io
TTL:   3600 (or default)
```

And configure an `ALIAS` or `ANAME` record for the root domain (if supported by your registrar):

```
Type:  ALIAS or ANAME
Name:  @ (or leave blank for root)
Value: blacklodgeswiss.github.io
TTL:   3600 (or default)
```

### Option 2: A Records (If ALIAS is not supported)
If your registrar doesn't support `ALIAS` records, use GitHub Pages IP addresses:

```
Type:  A
Name:  @ (or leave blank for root)
Value: 185.199.108.153
TTL:   3600

Type:  A
Name:  @ (or leave blank for root)
Value: 185.199.109.153
TTL:   3600

Type:  A
Name:  @ (or leave blank for root)
Value: 185.199.110.153
TTL:   3600

Type:  A
Name:  @ (or leave blank for root)
Value: 185.199.111.153
TTL:   3600
```

**IMPORTANT:** You also need the `CNAME` record for `www` subdomain:
```
Type:  CNAME
Name:  www
Value: blacklodgeswiss.github.io
TTL:   3600
```

## Steps to Configure DNS

1. **Log in to your domain registrar** (e.g., GoDaddy, Namecheap, Infomaniak, etc.)

2. **Navigate to DNS Management** section for `blacklodge.ch`

3. **Add DNS records** as specified in Option 1 or Option 2 above

4. **Save changes** and wait for DNS propagation (can take 5 minutes to 48 hours, typically within 1 hour)

5. **Verify DNS configuration** using the verification script in this repository

## Verification

After configuring DNS records, you can check if they are properly set up:

### Using Command Line (macOS/Linux):
```bash
# Check A records
dig blacklodge.ch A +short

# Check CNAME record for www
dig www.blacklodge.ch CNAME +short

# Check with nslookup
nslookup blacklodge.ch
nslookup www.blacklodge.ch
```

### Using Online Tools:
- [DNS Checker](https://dnschecker.org) - Check DNS propagation globally
- [What's My DNS](https://www.whatsmydns.net) - View DNS records worldwide
- [Google DNS](https://dns.google) - Query DNS records

### Expected Results:
```
blacklodge.ch should resolve to:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

www.blacklodge.ch should resolve to:
  - blacklodgeswiss.github.io
```

## After DNS is Configured

1. **Enable HTTPS in GitHub Pages Settings**:
   - Go to repository Settings > Pages
   - Check "Enforce HTTPS" option
   - Wait for SSL certificate to be provisioned (up to 24 hours)

2. **Test website access**:
   - https://blacklodge.ch
   - https://www.blacklodge.ch

## Common Issues and Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN" still appears after DNS configuration
**Solution:** Wait longer for DNS propagation. It can take up to 48 hours but usually completes within 1-2 hours.

### Issue: "Your connection is not private" / SSL error
**Solution:** Wait for GitHub to provision the SSL certificate. This can take up to 24 hours after DNS is properly configured.

### Issue: Website shows 404 error
**Solution:** Check that:
1. Repository name is `blacklodgeswiss.github.io`
2. CNAME file contains `blacklodge.ch`
3. Repository is public
4. GitHub Actions deployment is successful

## Contact Support

If you continue to experience issues after configuring DNS:
1. Verify DNS records are correct using the verification tools
2. Check GitHub Pages settings in repository Settings > Pages
3. Review GitHub Actions logs for deployment errors
4. Contact your domain registrar for DNS-specific issues

## Additional Resources

- [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Managing Custom Domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
