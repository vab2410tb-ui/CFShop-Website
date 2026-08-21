import Link from "next/link"
import Image from "next/image";

const Footer = () => {
    const footer_block = "grid  gap-5 content-start"
    const footer_item = "grid gap-1 text-[14px] text-gray-400 font-bold md:text-[16px] [&>li]:transition-colors [&>li:hover]:text-white"
    return(
        <div>
            <footer className="bg-black w-full h-full text-white px-[max(48px,calc(50%-700px))] text-gray-400">
                <div className="grid grid-cols-2 gap-10 lg:grid-cols-[auto_auto_auto_auto_auto] pt-[48px] md:pt-[64px]">
                    <div className={footer_block}>
                        <p className="text-[14px] md:text-[16px] font-bold">Shop</p>
                        <ul className={footer_item}>
                            <li>
                                <Link href="/">Espresso machine</Link>
                            </li>
                            <li>
                                <Link href="/">Grinder machine</Link>
                            </li>
                            <li>
                                <Link href="/">Coffee beans
                                </Link>
                            </li>
                            <li>
                                <Link href="/">Accessories</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={footer_block}>
                        <p className="text-[14px] md:text-[16px] font-bold">Support</p>
                        <ul  className={footer_item}>
                            <li>
                                <Link href="/">Team of use</Link>
                            </li>
                            <li>
                                <Link href="/">Delivery policy</Link>
                            </li>
                            <li>
                                <Link href="/">Return policy</Link>
                            </li>
                            <li>
                                <Link href="/">Warranty</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={footer_block}>
                        <p className="text-[14px] md:text-[16px] font-bold">Expolore</p>
                        <ul  className={footer_item}>
                            <li>
                                <Link href="/">About us</Link>
                               
                            </li>
                            <li>
                                <Link href="/">Blog</Link>
                                
                            </li>
                            <li>
                                <Link href="/">Contact us</Link>
                                
                            </li>
                        </ul>
                    </div>
                    <div className={footer_block}>
                        <p className="text-[14px] md:text-[16px] font-bold">Contact</p>
                        <ul  className="grid gap-1 text-[14px] md:text-[16px] text-white font-bold">
                            <li>1900 393 979</li>
                            <li>nabcfshop@gmail.com</li>
                        </ul>
                    </div>
                    <div className="grid  gap-5 content-start last:col-span-2 md:last:col-span-1"> 
                        <p className="text-[22px] md:text-[28px] font-bold">Subscribe to newsletter</p>
                        <div>
                            <p>Stay updated with news</p>
                        </div>
                        <div className="relative">
                            <input id="notify" placeholder=" " type="text" className="peer w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 "/>
                            <label 
                                htmlFor="notify" 
                                className="
                                    absolute left-3 top-4
                                    text-gray-500
                                    transition-all duration-200
                                    pointer-events-none
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                                    peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500
                                    peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs"
                            >
                                Email
                            </label>
                        </div>
                    </div>
                </div>
                <div className="py-[48px] md:py-[64px]">
                    <h5 className="font-bold text-[18px] md:text-[20px]">NATURAL AND BLANCE JOINT STOCK COMPANY</h5>
                    <div className="mt-[16px]">
                        <ul className="grid gap-2 text-[14px] md:text-[16px] list-disc pl-5">
                            <li>Business Registration Certificate: 0101993086</li>
                            <li>Issuing agency: Department of Planning and Investment of Ho Chi Minh City</li>
                            <li>Issued date: 10/10/2020</li>
                            <li>Address: Trang Dai Ward, Dong Nai, Viet Nam</li>
                        </ul>
                    </div>
                    <div className="h-[55px] max-w-[460px] mt-[48px]">
                       <Image 
                            src="/images/image-1.png"
                            width={70}
                            height={70}
                            alt="img"
                            className="object-contain w-full h-full"
                       />

                        
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer