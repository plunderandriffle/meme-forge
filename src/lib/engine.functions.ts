import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { applicationSchema } from './engine-schema';
import { z } from 'zod';
export const submitApplication=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>applicationSchema.parse(input)).handler(async({data,context})=>{
  const {full_name,x_handle,country,telegram,website,...application}=data;
  if(website) throw new Error('Unable to submit.');
  const {error:profileError}=await context.supabase.from('profiles').update({full_name,x_handle,country,telegram}).eq('id',context.userId);
  if(profileError) throw new Error('Your profile could not be saved. Please try again.');
  const {error}=await context.supabase.from('applications').insert({...application,user_id:context.userId});
  if(error) throw new Error(error.code==='23505'?'You already have an application. Check your application status.':'Your application could not be saved. Please try again.');
  await context.supabase.from('application_drafts').delete().eq('user_id',context.userId);
  return {ok:true};
});
export const getCreatorAccount=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:application,error}=await context.supabase.from('applications').select('*').eq('user_id',context.userId).maybeSingle();
 if(error) throw new Error('Unable to load your application.');
 const {data:profile}=await context.supabase.from('profiles').select('*').eq('id',context.userId).maybeSingle();
 return {application,profile};
});
export const reviewApplications=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:admin}=await context.supabase.rpc('is_creator_admin'); if(!admin) throw new Error('Administrator access required.');
 const {data,error}=await context.supabase.from('applications').select('*').order('created_at',{ascending:false});
 if(error) throw new Error('Unable to load applications.');return data??[];
});
export const updateApplicationStatus=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({id:z.string().uuid(),status:z.enum(['Submitted','Under Review','Approved','Declined'])}).parse(input)).handler(async({data,context})=>{
 const {data:admin}=await context.supabase.rpc('is_creator_admin');if(!admin) throw new Error('Administrator access required.');
 const {error}=await context.supabase.from('applications').update({status:data.status}).eq('id',data.id);if(error)throw new Error('Review could not be saved.');return {ok:true};
});