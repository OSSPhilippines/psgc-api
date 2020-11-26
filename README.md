![Logo](https://repository-images.githubusercontent.com/314212293/56574f00-2f00-11eb-81c6-7f2def9c2bcc)
## PSGC (Philippine Standard Geographic Code)

API used for listing all the region, province, city, municipality, and barangay. All data came from
[Philippine Statistics Authority](https://psa.gov.ph)
This API includes the total population for each regions etc. and other information.\
![Updated Data](https://img.shields.io/badge/Data-as%20of%20June%202020-green.svg)\
![Made With](https://img.shields.io/badge/Made%20with-Node.JS-68A063?style=for-the-badge&logo=Node.JS)

## DOCS
[Read Docs (Under construction)](https://psgc.vercel.app)

## ENDPOINTS (v1.1)

METHOD | Base URL
------------ | -------------
GET | [`https://psgc-api.herokuapp.com`](https://psgc-api.herokuapp.com/)

### REGION
Data | Endpoint
------------ | -------------
All Region | ```/api/region```
Specific Region | ```/api/region/:code```
List of Province in specific Region | ```/api/region/:code/province```

### PROVINCE
Data | Endpoint
------------ | -------------
All Province | ```/api/province```
Specific Province | ```/api/province/:code```
List of City in specific Province | ```/api/province/:code/city```
List of Municipality in specific Region | ```/api/province/:code/municipality```

### CITY
Data | Endpoint
------------ | -------------
All City | ```/api/city```
Specific City | ```/api/city/:code```
List of Barangay in specific City | ```/api/city/:code/barangay```

### MUNICIPALITY
Data | Endpoint
------------ | -------------
All Municipality | ```/api/municipality```
Specific Municipality | ```/api/municipality/:code```
List of Barangay in specific Municipality | ```/api/municipality/:code/barangay```

### BARANGAY
Data | Endpoint
------------ | -------------
All Barangay | ```/api/barangay```
Specific Barangay | ```/api/barangay/:code```

## PLANS
- [x] fix all the endpoints
- [x] add rate limit (currently at 50 calls per day)
- [ ] create the frontend with docs
- [ ] move to a proper server or upgrade dyno (hosted on heroku for now)

Made with 💜 by [Justin Balaguer](https://justinbalaguer.github.io/)\
[![Twitter](https://img.shields.io/badge/@ojintoji-Twitter-00acee.svg)](https://twitter.com/ojintoji/)\
[![Twitter](https://img.shields.io/badge/@ojintojix-Facebook-3b5998.svg)](https://facebook.com/ojintojix/)
###### dm me on any social media above to get the json files
