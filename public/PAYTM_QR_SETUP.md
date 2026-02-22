# Paytm QR Code Setup Instructions

## 📱 How to Add Your Paytm QR Code

### Step 1: Get Your Paytm QR Code
1. Open Paytm app on your phone
2. Go to **"Pay"** section
3. Click on **"Show QR Code"** or **"My QR"**
4. Take a screenshot of your QR code

### Step 2: Save the QR Code Image
1. Save the screenshot as `paytm-qr.png`
2. Make sure the image is clear and readable
3. Recommended size: 500x500px or larger
4. Format: PNG or JPG

### Step 3: Add to Website
1. Copy `paytm-qr.png` file
2. Paste it in the `public` folder of your website
3. The path should be: `public/paytm-qr.png`
4. The website will automatically display it in the payment modal

### Step 4: Test
1. Open your website
2. Click on any package (Basic/Standard/Premium)
3. Check if QR code is visible in the payment modal
4. Test scanning with Paytm app

## ✅ Verification Checklist
- [ ] QR code image is saved as `paytm-qr.png`
- [ ] Image is in the `public` folder
- [ ] QR code is clear and scannable
- [ ] Payment modal shows the QR code correctly
- [ ] QR code can be scanned with Paytm app

## 🔧 Troubleshooting

**If QR code doesn't show:**
- Check file name is exactly `paytm-qr.png` (case-sensitive)
- Make sure file is in `public` folder, not `src` folder
- Clear browser cache and refresh
- Check browser console for errors

**If QR code is blurry:**
- Use higher resolution image
- Save as PNG format for better quality
- Make sure QR code is centered in the image

## 📞 Support
If you face any issues, check:
1. File location: `public/paytm-qr.png`
2. File format: PNG or JPG
3. File size: Should be less than 2MB


