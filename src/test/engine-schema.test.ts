import {describe,it,expect} from 'vitest';
import {applicationSchema,emptyForm} from '@/lib/engine-schema';
const valid={...emptyForm,full_name:'Test Creator',email:'creator@example.com',country:'Sweden',vision:'Original content for my community.',interests:['Memes'],source:'A friend',consent:true};
describe('Creator application validation',()=>{
 it('accepts complete creator applications',()=>expect(applicationSchema.safeParse(valid).success).toBe(true));
 it('rejects missing identity',()=>expect(applicationSchema.safeParse({...valid,full_name:''}).success).toBe(false));
 it('requires consent',()=>expect(applicationSchema.safeParse({...valid,consent:false}).success).toBe(false));
 it('limits vision to 500 characters',()=>expect(applicationSchema.safeParse({...valid,vision:'a'.repeat(501)}).success).toBe(false));
 it('rejects unknown interests',()=>expect(applicationSchema.safeParse({...valid,interests:['Administrator']}).success).toBe(false));
 it('rejects spam honeypot input',()=>expect(applicationSchema.safeParse({...valid,website:'spam'}).success).toBe(false));
});