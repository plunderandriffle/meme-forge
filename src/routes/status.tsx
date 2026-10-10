import {createFileRoute,Link} from '@tanstack/react-router';
import {useEffect,useState} from 'react';
import {useServerFn} from '@tanstack/react-start';
import {supabase} from '@/integrations/supabase/client';
import {getCreatorAccount} from '@/lib/engine.functions';
import {pageHead} from '@/lib/engine-schema';
import {ApplicationState} from '@/components/application-state';
import {Button} from '@/components/ui/button';
export const Route=createFileRoute('/status')({head:()=>pageHead('Application status','View the status of your creator application.'),component:Status});
function Status(){const[status,setStatus]=useState<string|null>(null);const[message,setMessage]=useState('Loading your application…');const[guest,setGuest]=useState(false);const get=useServerFn(getCreatorAccount);useEffect(()=>{supabase.auth.getUser().then(async({data})=>{if(!data.user){setGuest(true);setMessage('Sign in to view your application.');return;}try{const result=await get();if(result.application)setStatus(result.application.status);else setMessage('Your creator journey is waiting. No application submitted yet.');}catch(e){setMessage(e instanceof Error?e.message:'Unable to load status.');}});},[get]);return <main className="state-page">{status?<ApplicationState status={status} approved={status==='Approved'}/>:<div className="state-content"><h1>Your application.</h1><p role="status">{message}</p><div className="state-links"><Button asChild><Link to={guest?'/auth':'/apply'}>{guest?'Sign in':'Apply for Access'}</Link></Button></div></div>}</main>}