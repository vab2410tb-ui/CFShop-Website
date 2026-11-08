"use client"

import { Button } from '@/components/ui/button';
import  FloatingInput  from '@/components/ui/floating-input';
import FloatingTextarea from '@/components/ui/floating-textarea';
import { MapPin, Phone, Mail } from 'lucide-react';


const ContactPage = () => {
    return(
        <div className="px-[max(20px,calc(50%-700px))] my-[80px] lg:my-[130px]">
            <h1 className="lg:text-[48px] text-[32px] text-center mb-[30px] lg:mb-[100px] font-bold">Contact</h1>
            <div className='flex flex-col gap-5 '>
                <div className='flex gap-5 lg:text-[28px] items-center'>
                    <MapPin className='w-6 h-6 lg:w-10 lg:h-10'/>
                    Address: N1 (Street), Trang Dai Ward, Dong Nai
                </div>
                <div className='flex gap-5 lg:text-[28px] items-center'>
                    <Phone className='lg:w-10 lg:h-10'/>
                    Hotline: 1900.393.979
                </div>
                <div className='flex gap-5 lg:text-[28px] items-center'>
                    <Mail className='lg:w-10 lg:h-10'/>
                    Email: nabcfshop@gmail.com
                </div>
            </div>
            <div className='flex justify-center mt-[130px]'>
                <div className="relative ">
                    <div className="absolute -inset-2 rounded-xl bg-gray-500/20 blur-sm" />
                    <div className="relative rounded-xl bg-white p-6 max-w-[1120px] h-[720px] px-[57px]" >
                        <h3 className='text-[24px] lg:text-[30px] pt-[93px] font-medium'>CONTACT</h3>
                        <p className='pt-[32px] text-[16px] lg:text-[28px]'>Please fill in the required information so that we can best assist you.</p>
                        <div className='flex flex-col gap-5 pt-10 text-[14px]'>
                            <div className="relative">
                                <div className="flex flex-col gap-4">
                                    <FloatingInput
                                        id="email"
                                        label="Email"
                                        type="email"
                                    />

                                    <FloatingInput
                                        id="name"
                                        label="Full name"
                                    />
                                    
                                    <div className=" border-1 rounded-md shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                                        <FloatingTextarea
                                            id="content"
                                            label="Content"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button className='w-full mt-10 py-5 lg:py-7 text-[18px] lg:text-[24px]'>SEND</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;