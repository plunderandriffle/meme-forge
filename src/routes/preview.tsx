import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {CreatorDashboard} from '@/components/creator-dashboard';
import {ApplicationState} from '@/components/application-state';
import {pageHead} from '@/lib/engine-schema';
export const Route=createFileRoute('/preview')({head:()=>pageHead('Explore the engine','Preview the creator application states and demo creator workspace.'),component:Preview});
function Preview(){const[state,setState]=useState('Dashboard');return <><div className="preview-control border-b border-border py-3"><span className="mr-3">EXPERIENCE PREVIEW</span>{['Pending','Approved','Dashboard'].map(s=><Button key={s} size="sm" variant={state===s?'secondary':'ghost'} className={state===s?'text-primary':''} onClick={()=>setState(s)}>{s}</Button>)}</div>{state==='Dashboard'?<CreatorDashboard/>:<main className="state-page"><div><ApplicationState preview approved={state==='Approved'}/>{state==='Approved'&&<Button className="w-full" onClick={()=>setState('Dashboard')}>Open demo workspace</Button>}</div></main>}</>}