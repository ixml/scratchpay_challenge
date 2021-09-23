### Scratchpay challenge

- View all available clinic
- Search clinic by name,state, from and to availability

---

<br />

#  Description

> Its a simple API for clinic search returns all available clinic by defualt and the record can be filtered by name ,state, availability from and to query parameters
> 

#  Usage

> The API returns record of all the available clinic record when /api/v1/clinics url is accessed, the record can be filtered by passing name,state, from  and to query paramters to filter by clinic name, clinic state , availability to and from respectively i.e /api/v1/clinics?name=health&state=CA&from=10:00&to=20:00


# Tech stack

Used Nodejs and express framework for the API development and nodeunit for testing

# Testing

Use nodeunit framework for testing, created 5 test method to verify API functionality


# Assumptions!

The API was built with the assumptions that clinic record will not become to large to create memory issue in which case database will be required to improve memory usage

