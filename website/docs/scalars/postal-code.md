---
id: postal-code
title: PostalCode
sidebar_label: PostalCode
---

We're going to start with a limited set as suggested [here](http://www.pixelenvision.com/1708/zip-postal-code-validation-regex-php-code-for-12-countries/)
and [here](https://stackoverflow.com/questions/578406/what-is-the-ultimate-postal-code-and-zip-regex).

Which gives us the following countries:

- US - United States
- UK - United Kingdom
- DE - Germany
- CA - Canada
- FR - France
- IT - Italy
- AU - Australia
- NL - Netherlands
- ES - Spain
- DK - Denmark
- SE - Sweden
- BE - Belgium
- IN - India
- IR - Iran

This is really a practical decision of weight (of the package) vs. completeness.

In the future we might expand this list and use the more comprehensive list found [here](http://unicode.org/cldr/trac/browser/tags/release-26-0-1/common/supplemental/postalCodeData.xml).
