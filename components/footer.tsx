import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="bg-neutral text-neutral-foreground border-t border-border mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex gap-2 justify-start items-center">
                            <Image
                                src={"/logo.png"}
                                height={70}
                                width={70}
                                alt="logo-image"
                            />
                            <h3 className="text-xl font-bold text-primary">رستوران کوروش</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            از رستوران‌ مورد علاقه‌تان غذای خوشمزه سفارش دهید و درب منزل تحویل بگیرید
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4">رستوران</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    درباره ما
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    بلاگ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h4 className="font-semibold mb-4">آدرس</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">مازندران، نوشهر، میدان شموشک، روبروی باغ اکولوژی، جنب هایپر جانبو</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()}  حقوق مادی و معنوی متعلق به <span className="text-primary">رستوران کوروش</span> است.</p>
                </div>
            </div>
        </footer>
    )
}
