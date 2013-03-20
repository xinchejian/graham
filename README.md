Graham -- Thank you for inventing the MUTE button.
============

Pages:
-----------------

1. Membership applicaiton page
  - Accessible from anywhere for anybody
  - Showing all necessary fields for a member
     - name
     - email
     - mobile
     - introduction?
     - photo?
  - Require email to verify

2. Membership status page, access via QR code.
  - If the membership has expired


3. Membership activation page
  - Only accessible to staff members
  - Need authentication, password/nfc

4. Member list page
  - Only accessible to staff members
  - Show basic info, sort by expiry etc
  - Membership card issue status

5. Member details page
  - Add payment
  - Modify member info
  - Creation of member card

6. Payment list page

7. Logs page


Auto emails:
-----------------

1. Application verification email
2. Membership application alert email to staff
3. Membership card ready email
4. Membership about to expire email
5. Membership expiry email

External interfaces

1. Machine room door control / log
2. Space access control (connect to door.xinchejian.com?)
3. Membership status check via QR code



Database:
-----------------
1. Tables / Collections
member
payment
log



Installing on OSX:
-----------------
1. brew install cairo (for canvaas)
2. PKG_CONFIG_PATH=/usr/X11/lib/pkgconfig/ npm install
