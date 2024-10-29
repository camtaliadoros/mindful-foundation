import { Section } from '@/components/shared/Section';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Section classes='flex items-center justify-end'>
        <div className='grid grid-cols-6 items-center py-16'>
          <div className='grid grid-cols-12 col-span-4'>
            <h1 className='font-lexend text-6xl col-span-10 flex justify-self-end font-black  text-rightleading-snug text-mf-red'>
              Empowering Lives,
            </h1>
            <h1 className='font-lexend text-6xl col-span-11 flex justify-self-end font-black  text-right  leading-snug text-mf-red'>
              Preventing Harm,
            </h1>
            <h1 className='font-lexend text-6xl col-span-12 flex justify-self-end font-black  text-right leading-snug text-mf-red'>
              Healing Futures
            </h1>
          </div>
          <Image
            src='/images/pebbles.png'
            width={300}
            height={300}
            alt=''
            className='col-span-2'
          />
        </div>
      </Section>
      <Section classes='grid grid-cols-3 -mt-60'>
        <div className='flex flex-col mb-0 items-center'>
          <h2 className='text-mf-red text-7xl font-black relative font-lexend'>
            Our Mission
          </h2>
          <div className='bg-mf-red h-5 absolute' />
          <div className='bg-mf-red rounded-2xl -mt-4 p-8'>
            <p className='text-mf-chalk font-lexend'>
              Our mission is to provide individuals with tools and knowledge to
              avoid abusive behaviours, build healthy relationships, and promote
              emotional well-being, resulting in safer and happier communities.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
