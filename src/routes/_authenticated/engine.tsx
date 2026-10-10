import {createFileRoute} from '@tanstack/react-router';
import {queryOptions,useSuspenseQuery} from '@tanstack/react-query';
import {getCreatorAccount} from '@/lib/engine.functions';
import {CreatorDashboard} from '@/components/creator-dashboard';
import {ApplicationState} from '@/components/application-state';
import {pageHead} from '@/lib/engine-schema';
const accountOptions=queryOptions({queryKey:['creator-account'],queryFn:()=>getCreatorAccount()});
export const Route=createFileRoute('/_authenticated/engine')({head:()=>pageHead('Creator workspace','Your private creator workspace.'),loader:({context})=>context.queryClient.ensureQueryData(accountOptions),component:Engine});
function Engine(){const{data}=useSuspenseQuery(accountOptions);if(data.application?.status!=='Approved')return <main className="state-page"><ApplicationState status={data.application?.status??'Not submitted'}/></main>;return <CreatorDashboard demo={false} name={data.profile?.full_name||'Creator'} handle={data.profile?.x_handle||'Creator'}/>}