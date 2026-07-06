import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEnquiry } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin, Phone, Mail, Instagram, Facebook, X, Menu } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

import logo from "@assets/46949ce0-cd4e-422e-9a9c-686f17436333_copy_copy_1783344356068.png";
import licensedRepairerLogo from "@assets/licensed_repairer_logo_nobg.png";
import cv8_1 from "@assets/CV8_Monaro_(1)_1783345538890.JPG";
import cv8_2 from "@assets/CV8_Monaro_(2)_1783345538890.JPG";
import cv8_3 from "@assets/CV8_Monaro_(3)_1783345538890.JPG";
import cv8_4 from "@assets/CV8_Monaro_(4)_1783345538891.JPG";

import vy_ss_1 from "@assets/VY_SS_(1)_1783345561220.JPG";
import vy_ss_2 from "@assets/VY_SS_(2)_1783345561220.JPG";
import vy_ss_3 from "@assets/VY_SS_(3)_1783345561220.JPG";
import vy_ss_4 from "@assets/VY_SS_(4)_1783345561220.JPG";
import vy_ss_5 from "@assets/VY_SS_(5)_1783345561220.JPG";
import vy_ss_6 from "@assets/VY_SS_(6)_1783345561220.JPG";

import ve_ss_1 from "@assets/VE_SS_(1)_1783345581192.jpg";
import ve_ss_2 from "@assets/VE_SS_(2)_1783345581193.JPG";
import ve_ss_3 from "@assets/VE_SS_(3)_1783345581193.JPG";
import ve_ss_4 from "@assets/VE_SS_(4)_1783345581193.JPG";

import hsv_1 from "@assets/VE_HSV_Seats_(1)_1783345598277.JPG";
import hsv_2 from "@assets/VE_HSV_Seats_(2)_1783345598277.JPG";
import hsv_3 from "@assets/VE_HSV_Seats_(3)_1783345598277.JPG";

import supra_1 from "@assets/MK4_Supra_Starlights_(3)_1783350982068.jpg";
import supra_2 from "@assets/MK4_Supra_Starlights_(1)_1783350982068.JPG";
import supra_3 from "@assets/MK4_Supra_Starlights_(4)_1783350982068.JPG";
import supra_4 from "@assets/MK4_Supra_Starlights_(2)_1783350982068.JPG";


const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").max(320),
  phone: z.string().max(50).optional().nullable(),
  vehicle: z.string().max(200).optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const { toast } = useToast();
  const createEnquiry = useCreateEnquiry();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [openService, setOpenService] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    createEnquiry.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Enquiry Sent",
            description: "Thanks for reaching out. We'll be in touch soon.",
          });
          form.reset();
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Failed to send enquiry",
            description: error.data?.error || "Please try again later.",
          });
        },
      }
    );
  }

  const projects = [
    {
      title: "Holden CV8 Monaro",
      desc: "Black diamond-stitch leather retrim",
      images: [cv8_1, cv8_2, cv8_3, cv8_4],
    },
    {
      title: "Holden VY SS Ute",
      desc: "Cream/tan diamond-stitch leather retrim",
      images: [vy_ss_5, vy_ss_1, vy_ss_2, vy_ss_3, vy_ss_4, vy_ss_6],
    },
    {
      title: "Holden VE SS Ute",
      desc: "Grey diamond-stitch fabric/suede retrim",
      images: [ve_ss_1, ve_ss_2, ve_ss_3, ve_ss_4],
    },
    {
      title: "HSV Custom Seats",
      desc: "Black leather/suede with embroidered HSV lion badges",
      images: [hsv_1, hsv_2, hsv_3],
    },
    {
      title: "MK4 Supra Starlight",
      desc: "Alcantara wrapped headlining with 1000 starlight kit installed",
      images: [supra_1, supra_2, supra_3, supra_4],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Header */}
      <header className="absolute top-0 w-full z-50 p-6 md:p-8 flex justify-between items-center">
        <div className="w-32 sm:w-40 md:w-56">
          <img src={logo} alt="Ace Automotive Trimming" className="w-full h-auto object-contain brightness-0 invert" />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="md:hidden w-11 h-11 flex items-center justify-center text-white"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-zinc-950 border-border w-3/4 sm:max-w-xs flex flex-col">
            <div className="flex flex-col gap-8 mt-16 text-lg font-medium tracking-widest uppercase text-muted-foreground">
              <SheetClose asChild>
                <a href="#services" className="hover:text-primary transition-colors">Services</a>
              </SheetClose>
              <SheetClose asChild>
                <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              </SheetClose>
              <SheetClose asChild>
                <a href="#about" className="hover:text-primary transition-colors">About</a>
              </SheetClose>
              <SheetClose asChild>
                <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Hero */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-12 overflow-hidden border-b border-border">
        {/* Background dark overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-background to-background z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 mix-blend-overlay" />
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 m-auto w-[140vw] max-w-none md:w-[70vw] opacity-[0.05] brightness-0 invert pointer-events-none select-none z-0"
        />

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] text-white">
            Obsessive <br/><span className="text-primary">Precision.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl font-light">
            Premium automotive trimming, custom interiors, and restoration. 
            Attention to detail meeting hand-stitched perfection in Wangara, WA.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex h-12 items-center justify-center bg-primary text-primary-foreground px-8 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
              Get a Quote
            </a>
            <a href="#projects" className="inline-flex h-12 items-center justify-center border border-border bg-transparent text-foreground px-8 text-sm font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-950 border-b border-border">
        <div className="container mx-auto px-6">
          <Reveal className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Our Services</h2>
            <p className="text-muted-foreground max-w-sm">Specializing in high-end re-trims and restorations. If it's in the cabin, we craft it.</p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              {
                title: "Seat Repairs",
                desc: "Fixing tears, worn bolsters, and damaged foam to bring tired seats back to like-new condition.",
              },
              {
                title: "Headlinings",
                desc: "Replacing sagging or stained headlining fabric with a clean, factory-tight finish.",
              },
              {
                title: "Tonneau Covers",
                desc: "Custom-fitted tray and ute covers built to protect your load and match your interior.",
              },
              {
                title: "Steering Wheel Recovers",
                desc: "Re-wrapping worn steering wheels in fresh leather with clean, precise stitching.",
              },
              {
                title: "Leather Retrims",
                desc: "Full seat and interior leather retrims in your choice of colour, stitch pattern, and finish.",
              },
              {
                title: "Classic Car Resto Seat Work",
                desc: "Period-correct seat restorations for classic and custom builds, done to show standard.",
              },
              {
                title: "General Repairs and Maintenance",
                desc: "Ongoing trim upkeep and repairs to keep your interior looking sharp for years to come.",
              },
              {
                title: "Carpet Replacement",
                desc: "Fitting new moulded or custom-cut carpet sets to replace worn, torn, or faded flooring.",
              },
              {
                title: "Marine Seats",
                desc: "Custom-built and reupholstered boat seating made to withstand sun, salt, and spray.",
              },
            ].map((service, i) => {
              const isOpen = openService === i;
              return (
                <Reveal key={i} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setOpenService(isOpen ? null : i)}
                    className="group relative w-full text-left border-t border-border pt-6"
                  >
                    <h3 className={cn(
                      "text-xl font-medium transition-colors md:group-hover:text-primary",
                      isOpen && "text-primary"
                    )}>
                      {service.title}
                    </h3>
                    <p className={cn(
                      "md:hidden overflow-hidden text-sm font-light text-muted-foreground transition-all duration-300 ease-out",
                      isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                    )}>
                      {service.desc}
                    </p>
                    <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-72 max-w-[80vw] translate-y-1 opacity-0 transition-all duration-200 md:block md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      <p className="border border-border bg-zinc-900 px-4 py-3 text-sm font-light text-muted-foreground shadow-lg">
                        {service.desc}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-16 text-center text-lg font-medium uppercase tracking-widest text-primary">
            And Much More
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-16">Recent Projects</h2>
          </Reveal>
          
          <div className="flex flex-col gap-12">
            {projects.map((project, idx) => (
              <Reveal key={idx} className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-4">
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white">{project.title}</h3>
                  <p className="text-primary text-sm font-medium">{project.desc}</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 md:gap-3">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxImage({ src: img, alt: `${project.title} detail ${i + 1}` })}
                      className="aspect-square bg-zinc-900 overflow-hidden relative group cursor-zoom-in"
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} detail ${i+1}`} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                    </button>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-zinc-950 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8">The Craftsman</h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light">
                <p>
                  Ace Automotive Trimming is run by Anthony Lenzo, a qualified tradesman with a lifelong background in classic and custom cars.
                </p>
                <p>
                  Established in 2021, the business was built on a foundation of obsessive attention to detail and a genuine passion for automotive culture. We don't just replace material; we restore character and elevate the driving experience.
                </p>
                <p className="text-white font-medium">
                  Licensed Repairer WA — MRB 13098
                </p>
                <img
                  src={licensedRepairerLogo}
                  alt="Licensed Repairer Western Australia"
                  className="w-32 h-auto"
                />
              </div>
            </Reveal>
            <Reveal delay={150} className="aspect-square bg-zinc-900 flex items-center justify-center p-12 border border-border">
              {/* Abstract logo graphic for the about section */}
              <img src={logo} alt="Ace Logo" className="opacity-20 brightness-0 invert max-w-full h-auto" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact / Enquiry Form */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8">Get In Touch</h2>
              <p className="text-muted-foreground mb-12">
                Ready to discuss your next project or finally get that trim repaired? Fill out the form with details about your vehicle and what you're looking to achieve, and we'll get back to you with a quote.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Workshop</h4>
                    <p className="text-muted-foreground">Unit 3/47 Dellamarta Road<br/>Wangara WA 6065</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Phone</h4>
                    <p className="text-muted-foreground">0434 313 810</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Email</h4>
                    <p className="text-muted-foreground">admin@aceautotrim.com.au</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={150} className="bg-card p-8 border border-border">
              <h3 className="text-2xl font-bold uppercase mb-6 text-white border-b border-border pb-4">Project Enquiry</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background border-border rounded-none h-12 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" className="bg-background border-border rounded-none h-12 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="0400 000 000" className="bg-background border-border rounded-none h-12 focus-visible:ring-primary" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Vehicle Make/Model</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Holden VY SS" className="bg-background border-border rounded-none h-12 focus-visible:ring-primary" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-wider text-xs text-muted-foreground">Project Details *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about the work you need done..." 
                            className="min-h-[120px] bg-background border-border rounded-none resize-none focus-visible:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                    disabled={createEnquiry.isPending}
                  >
                    {createEnquiry.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </Button>
                </form>
              </Form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-primary hover:text-primary transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-zinc-950 py-12 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
          <img src={logo} alt="Ace Automotive Trimming" className="w-24 opacity-50 brightness-0 invert" />
          <p>© {new Date().getFullYear()} Ace Automotive Trimming. All rights reserved.</p>
          <p className="uppercase tracking-widest text-xs">Licensed Repairer WA — MRB 13098</p>
        </div>
      </footer>
    </div>
  );
}
