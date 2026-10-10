import { z } from 'zod';
export const interests = ['Memes','Video','Music','Product Reviews','Global Content','Distribution','Automation'] as const;
export const creatorTypes = ['Creator','Developer','Business Owner','Community Admin','Affiliate Marketer','Trader','Other'] as const;
export const applicationSchema = z.object({
  full_name:z.string().trim().min(2,'Enter your full name.').max(100), email:z.string().trim().email().max(255),
  x_handle:z.string().trim().max(50), country:z.string().min(1,'Select your country.').max(100), telegram:z.string().trim().max(50),
  vision:z.string().trim().min(10,'Tell us a little more (at least 10 characters).').max(500),
  creator_type:z.enum(creatorTypes), interests:z.array(z.enum(interests)).min(1,'Choose at least one interest.').max(7),
  intended_use:z.enum(['Personal','Business','Community','Client Work']), source:z.string().min(1,'Select how you found us.').max(100),
  referral:z.string().max(50), consent:z.boolean().refine(v=>v,'Agree to the terms to continue.'), website:z.string().max(0),
});
export type ApplicationForm = z.infer<typeof applicationSchema>;
export const emptyForm:ApplicationForm = {full_name:'',email:'',x_handle:'',country:'',telegram:'',vision:'',creator_type:'Creator',interests:[],intended_use:'Personal',source:'',referral:'',consent:false,website:''};
export function pageHead(title:string,description:string){return {meta:[{title:`${title} — The Meme Engine`},{name:'description',content:description},{property:'og:title',content:`${title} — The Meme Engine`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}