import dog from '@/assets/content-0.jpg';
import astronaut from '@/assets/content-1.jpg';
import car from '@/assets/content-2.jpg';
import music from '@/assets/content-3.jpg';
import coast from '@/assets/content-4.jpg';
import keyboard from '@/assets/content-5.jpg';
import { Glyph } from './engine-brand';
import { Play, AudioLines, ArrowUpRight } from 'lucide-react';
export const contentImages=[dog,astronaut,car,music,coast,keyboard];
export function ContentWall(){return <div className="wall-scene" aria-label="Original memes, video frames, and music artwork"><div className="wall-coordinate coordinate-top">ENGINE OUTPUT / LIVE PREVIEW</div><div className="content-wall">{[0,-1,1,2,3,-1,4,5,0].map((image,i)=><div className={`wall-tile tile-${i} ${image<0?'glyph-tile':''}`} key={i}>{image<0?<><Glyph/><span>ME / ENGINE</span></>:<><img src={contentImages[image]} alt={['Shiba creator meme','Astronaut in a flower meadow','Neon sports car','Chrome music artwork','Turquoise coastline','Mechanical keyboard'][image]} width={512} height={512}/><div className="tile-caption"><span>{['MEME / 001','VIDEO / 002','VIDEO / 003','AUDIO / 004','GLOBAL / 005','PRODUCT / 006'][image]}</span>{image===3?<AudioLines size={13}/>:image===1||image===2?<Play size={13}/>:<ArrowUpRight size={13}/>}</div>{image===0&&i===0&&<div className="meme-caption">BORN TO CREATE.<br/>FORCED TO POST.</div>}</>}</div>)}</div><div className="wall-coordinate coordinate-bottom"><span className="text-primary">+ </span> IDEAS IN. CULTURE OUT.</div><span className="scene-cross cross-a">+</span><span className="scene-cross cross-b">+</span></div>}