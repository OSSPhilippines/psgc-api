# PSGC (Philippine Standard Geographic Code)
API used for listing all the region, province, city, municipality, and barangay. All data came from <a href='https://psa.gov.ph' target='_blank'>Philippine Statistics Authority</a>. This API includes the total population for each regions etc. and other information.

# ENDPOINTS (v1.1)
All Region - ```/api/region```<br/>
Specific Region - ```/api/region/:code```<br/>
List of Province in specific Region - ```/api/region/:code/province```<br/><br/>
All Province - ```/api/province```<br/>
Specific Province - ```/api/province/:code```<br/>
List of City in specific Province - ```/api/province/:code/city```<br/>
List of Municipality in specific Province - ```/api/province/:code/municipality```<br/>
All City - ```/api/city```<br/>
Specific City - ```/api/city/:code```<br/>
List of Barangay in specific City - ```/api/city/:code/barangay```<br/>
All Municipality - ```/api/municipality```<br/>
Specific Municipality - ```/api/municipality/:code```<br/>
List of Barangay in specific Municipality - ```/api/municipality/:code/barangay```<br/>
All Barangay - ```/api/barangay```<br/>
Specific Barangay - ```/api/barangay/:code```<br/>

# ENDPOINTS (V1)
REGION - ```/v1/region```<br/>
PROVINCE - ```/v1/province```<br/>
CITY - ```/v1/city```<br/>
MUNICIPALITY - ```/v1/municipality```<br/>
BARANGAY - ```/v1/barangay```<br/>

# SETUP
```$ npm install```

# START DEV SERVER
```$ npm run dev```

# PLANS
- [x] fix all the endpoints
- [x] add rate limit
- [ ] create the frontend with docs
- [ ] move to a proper server

Made with 💜 by Justin Balaguer
<a href='twitter.com/ojintoji/'>Twitter</a>
<a href='facebook.com/ojintojix/'>Facebook</a>
###### dm me on any social media above to get the json files