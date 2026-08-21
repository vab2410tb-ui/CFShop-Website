
const WarrantyPage = () => {
    return(
        <div className="px-[max(20px,calc(50%-700px))] my-[80px] lg:my-[130px]">
            <h1 className="lg:text-[48px] text-[32px] text-center mb-[30px] lg:mb-[100px] font-bold">WARRANTY POLICY</h1>
            <p className="lg:text-[28px] text-justify">At <b>NabCoffeeShop</b>, we pride ourselves on offering premium espresso machines, coffee grinders, specialty coffee beans, and brewing accessories designed to elevate your coffee experience. We are committed to repairing or replacing faulty hardware and equipment during the warranty period (typically 12 to 24 months depending on the product line) — ensuring peace of mind with every brew</p>
            <ol className="list-decimal list-outside mt-[40px] lg:mt-[80px] pl-6 space-y-8 text-2xl lg:text-[38px]">
            
                <li>
                    <span className="pl-1">Scope of warranty application</span>
                    <ol className="list-none mt-4 space-y-3 text-sm lg:text-[28px] font-normal text-gray-600 pl-2">
                        <li>1.1. The warranty policy is only valid in the territory of Vietnam. Products used outside of this area will not be covered by the warranty.</li>
                        <li>1.2. The warranty applies to purchases made directly from NabCoffeeShop or our authorized dealers, provided proof of purchase (invoice, warranty card, or order ID) is provided.</li>
                        <li>1.3. If the product was purchased from a third party, e-commerce platform (e.g., Shopee, Lazada), or an unauthorized seller, please contact the seller directly for assistance.</li>
                        <li>
                            1.4. The warranty will be void if:
                            <ul className="list-disc list-outside pl-6 mt-2 space-y-1">
                                <li>The product has been dismantled or repaired by unauthorized third-party technicians.</li>
                                <li>The product is used with incompatible power sources, unapproved spare parts, or improper water supplies (e.g., direct hard/unfiltered water causing scale buildup).</li>
                                <li>The product is shipped or relocated outside of Vietnam.</li>
                            </ul>
                        </li>
                    </ol>
                </li>

                <li>
                <span className="pl-1">Warranty Conditions</span>
                <ol className="list-none mt-4 space-y-3 text-sm lg:text-[28px] font-normal text-gray-600 pl-2">
                    <li>2.1. Customers need to notify the damage within 7 days of receiving the product, accompanied by an image or video sent to NabCoffeeShop via official support channels.</li>
                    <li>2.2. The product must be used in accordance with NabCoffee&aposs user manual to ensure warranty benefits.</li>
                    <li>
                        2.3. The warranty applies to internal manufacturing defects and technical failures, including:
                        <ul className="list-disc list-outside pl-6 mt-2 space-y-1">
                            <li>Electrical and electronic component failures (PID controller, mainboard, display panel).</li>
                            <li>Motor, pump, and boiler malfunctions under standard operating conditions.</li>
                            <li>Structural defects in casting or internal plumbing originating from manufacturing.</li>
                        </ul>
                    </li>
                </ol>
                </li>

                <li>
                    <span className="pl-1">Cases not covered by the warranty</span>
                    <div className="mt-4 text-sm lg:text-[28px] font-normal text-gray-600 pl-2 space-y-4">
                        <p>The NabCoffeeShop warranty does not cover the following:</p>

                        <div>
                            <p className="mb-1">Natural wear and tear & Consumables:</p>
                            <ul className="list-disc list-outside pl-6 space-y-1">
                                <li>Normal cosmetic wear (scratches, scuffs on polished steel/matte finish, portafilter wear).</li>
                                <li>Consumable parts subject to routine replacement (grouphead gaskets/O-rings, shower screens, silicone seals, and grinder burr wear due to normal high-volume usage).</li>
                                <li>Coffee beans: As a consumable food product, coffee beans are exempt from hardware warranty. (Quality or packaging claims must be reported within 48 hours of delivery).</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-1">Misuse & Improper Maintenance:</p>
                            <ul className="list-disc lg:text-[28px] list-outside pl-6 space-y-1">
                                <li>Damage caused by scale accumulation, limescale blockage, or corrosion from using unpurified or mineral-heavy water.</li>
                                <li>Operating the espresso machine without water (dry boiling/pump burnout).</li>
                                <li>Grinder motor jam or burr damage caused by foreign objects (stones, metal debris, unroasted objects) or attempting to grind wet/flavored/sticky ingredients.</li>
                                <li>Using incorrect voltage or experiencing severe power surges.</li>
                                <li>Damage from harsh cleaning chemicals, chlorine, or soaking non-waterproof electrical components.</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-1">External Impact & Arbitrary Intervention:</p>
                            <ul className="list-disc lg:text-[28px] list-outside pl-6 space-y-1">
                                <li>Damage caused by drops, impacts, transit accidents, or liquid spills onto internal circuits.</li>
                                <li>Damage caused by unauthorized modifications, self-repair, pressure profiling mods, or altering factory electrical wiring.</li>
                                <li>Damage caused by natural disasters, pests, or insects (e.g., ants/cockroaches nesting inside electronic housings).</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-1">Arbitrarily intervene:</p>
                            <ul className="list-disc list-outside pl-6 space-y-1">
                                <li>Damage caused by arbitrary disassembly, repair, or alteration of the product structure.</li>
                                <li>Damage caused by the use of non-genuine accessories from NabCoffeeShop.</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-1">Force majeure factors:</p>
                            <ul className="list-disc list-outside pl-6 space-y-1">
                                <li>Damage caused by natural disasters (floods, fires), insects, or rodents.</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-1">Chemical Damage:</p>
                            <ul className="list-disc list-outside pl-6 space-y-1">
                                <li>Use of cleaning chemicals (alcohol, bleach, etc.) that damages the surface finish.</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mb-1">Natural Properties:</p>
                            <ul className="list-disc list-outside pl-6 space-y-1">
                                <li>Differences in wood grain or natural material texture are not considered manufacturing defects.</li>
                            </ul>
                        </div>
                    </div>
                </li>

                <li>
                    <span className="pl-1">Warranty Process</span>
                    <ul className="list-disc list-outside mt-4 space-y-2 text-sm lg:text-[28px] font-normal text-gray-600 pl-8">
                        <li><strong>Step 1:</strong> Contact NabCoffeeShop via Website / Hotline / Zalo when an issue occurs.</li>
                        <li><strong>Step 2:</strong> Provide proof of purchase, product serial number, and a short video/photo describing the technical malfunction.</li>
                        <li><strong>Step 3:</strong> Our technical team will diagnose remotely within 24-48 hours and instruct on bringing/shipping the unit to our service center.</li>
                        <li><strong>Step 4:</strong> Product will be inspected, serviced, or replaced under the warranty terms.</li>
                    </ul>
                </li>

                <li>
                    <span className="pl-1">Contact Support</span>
                    <div className="mt-4 text-sm lg:text-[28px] font-normal text-gray-600 pl-2 space-y-2">
                        <p>For any questions about the warranty policy or to request assistance, please contact us:</p>
                        <ul className="list-disc list-outside pl-6 space-y-1">
                            <li>Email: nabcfshop@gmail.com</li>
                            <li>Hotline: 1900.393.979</li>
                            <li>Address: N1 (Street), Trang Dai Ward, Dong Nai, Viet Nam</li>
                        </ul>
                    </div>
                </li>

            </ol>
        </div>
    );
}

export default WarrantyPage;