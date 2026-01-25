**Question 1:**

 
From: marissa@startup.com  
Subject:  Bad design  

Hello,  
  
Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.  
   
Thanks,  
Marissa  
  

**Answer 1:**


Re:  Bad design
From: emmanuelle@algolia.com  
To: marissa@startup.com

Hi Marissa,

Thank you for taking the time to share this feedback, I really appreciate you being candid. I understand how frustrating it can be when frequently used actions take more steps, especially during active iteration workflows.

I’ve shared your feedback with the product team, as improving efficiency for our customers is something we care a lot about here at Algolia. The current setup was implemented because it made sense at the time from a design and safety perspective, but I completely understand how it can become frustrating while iterating.

If you’re open to it, I’d love to learn a bit more about your workflow and intent so I can better understand your use case and see if there’s any way I can help make things smoother.

Thanks again for flagging this.

Best,  
 
Emmanuelle 
  
--

**Question 2:**   
  
From: carrie@coffee.com  
Subject: URGENT ISSUE WITH PRODUCTION!!!!  
  
Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".  
  
Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?  
  
Please advise on how to fix this. Thanks.   


**Answer 2:**

 
Re:  URGENT ISSUE WITH PRODUCTION!!!! 
From: emmanuelle@algolia.com  
To: carrie@coffee.com 

Hi Carrie,

Thanks for reaching out, and sorry for the disruption this has caused.I understand how frustrating this must be, especially with users unable to publish their feedback.

The error you’re seeing (“Record is too big”) happens when a record exceeds Algolia’s size limit (10KB per record). This limit applies regardless of plan, and it sounds like the additional metadata you’re enriching each record with is pushing some records over that threshold.

To resolve this, I’d recommend removing any metadata that isn’t needed for search from the indexed records.

I know this may not be ideal, especially if the enrichment makes sense for your use case, but keeping records lean is required for search performance and reliability.

If you’d like, feel free to share a sample record, and I can help you identify what could be trimmed or restructured to get things working again as quickly as possible.

Regards,

Emmanuelle
  
--

**Question 3:**:   


From: marc@hotmail.com  
Subject: Error on website  
  
Hi, my website is not working and here's the error:  
  
![error message](./error.png)  
  
Can you fix it please?  


**Answer 3:**:

 
Re:  Error on website 
From: emmanuelle@algolia.com  
To: marc@hotmail.com 

Hi Marc,

Thanks for sharing the error message.

The error shown (ReferenceError: searchkit is not defined) indicates that your website is trying to use an essential tool for the search (searchkit library), but isn't able to do so.

Unfortunately, with just the error message, I’m not able to fix the issue directly. To move this forward, would it be possible to put me in touch with your technical team? I’d like to ask them a few questions to better understand what’s happening, such as:

- Where and how searchkit is being imported or initialized

- Whether this started after a recent deployment or change

- If they can share the relevant code snippet or repository

Once I have a bit more context, I’ll be happy to help pinpoint the issue and suggest a fix.

Thanks and regards,

Emmanuelle
