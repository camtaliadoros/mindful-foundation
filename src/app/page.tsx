import { Section } from '@/components/shared/Section';
import Image from 'next/image';

export default function Home() {
  return (
    <Section classes='flex items-center justify-end'>
      <div className='grid grid-cols-6 items-center py-16'>
        <div className='grid grid-cols-12 col-span-4'>
          <h1 className='text-6xl col-span-10 flex justify-self-end font-extrabold text-rightleading-snug text-mf-red'>
            Empowering Lives,
          </h1>
          <h1 className='text-6xl col-span-11 flex justify-self-end font-extrabold text-right  leading-snug text-mf-red'>
            Preventing Harm,
          </h1>
          <h1 className='text-6xl col-span-12 flex justify-self-end font-extrabold text-right leading-snug text-mf-red'>
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
  );
}
