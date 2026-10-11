"use client";

import { type FormEvent, type ReactNode, useRef, useState } from "react";

import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";

import { Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";

import { FiUpload } from "react-icons/fi";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const inputClass =

"h-11 w-full rounded-md border border-[#595959] bg-[#333333] px-3 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[50px] sm:px-4";

const queryClient = new QueryClient();

type QuotePayload = {

name: string;

phoneNumber: string;

email: string;

location: string;

projectName: string;

projectBudget: string;

projectStatus: string;

message: string;

photo?: File;

};

type QuoteResponse = {

success?: boolean;

status?: boolean;

message?: string;

error?: string;

};

export default function RequestQuoteForm() {

const { data: session } = useSession();

const photoRef = useRef&lt;HTMLInputElement&gt;(null);

const [photo, setPhoto] = useState&lt;File | null&gt;(null);

const handleSubmit = async (event: FormEvent&lt;HTMLFormElement&gt;) =&gt; {

event.preventDefault();

const formData = new FormData(event.currentTarget);

const name = formData.get("name") as string;

const phoneNumber = formData.get("phoneNumber") as string;

const email = formData.get("email") as string;

const location = formData.get("location") as string;

const projectName = formData.get("projectName") as string;

const projectBudget = formData.get("projectBudget") as string;

const projectStatus = formData.get("projectStatus") as string;

const message = formData.get("message") as string;

const payload: QuotePayload = {

name,

phoneNumber,

email,

location,

projectName,

projectBudget,

projectStatus,

message,

};

if (photo) {

payload.photo = photo;

}

mutation.mutate(payload);

};

const mutation = useMutation({

mutationFn: async (payload: QuotePayload) =&gt; {

const res = await fetch("/api/quote", {

method: "POST",

body: JSON.stringify(payload),

});

if (!res.ok) throw new Error("Error");

return res.json();

},

onSuccess: (data: QuoteResponse) =&gt; {

if (data.success || data.status) {

toast.success("Success", {

description: data.message,

});

}

else {

toast.error("Error", {

description: data.message || data.error,

});

}

(globalThis as typeof globalThis &amp; { gtag?: (...args: unknown[]) =&gt; void }).gtag?.(

  "event",

  "conversion",

  { send_to: "AW-18374418828/aI3mCOqr4t4cEIzDzblE" }

);

},

onError: (error) =&gt; {

toast.error("Error", {

description: error.message,

});

},

});

return (

&lt;QueryClientProvider client={queryClient}&gt;

&lt;form onSubmit={handleSubmit} className="flex flex-col gap-y-6"&gt;

&lt;input

type="text"

name="name"

placeholder="Your Name"

required

className={inputClass}

/&gt;

&lt;input

type="tel"

name="phoneNumber"

placeholder="Your Phone Number"

required

className={inputClass}

/&gt;

&lt;input

type="email"

name="email"

placeholder="Your Email"

required

className={inputClass}

/&gt;

&lt;input

type="text"

name="location"

placeholder="Your Location"

required

className={inputClass}

/&gt;

&lt;input

type="text"

name="projectName"

placeholder="Project Name"

required

className={inputClass}

/&gt;

&lt;div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-6"&gt;

&lt;select

name="projectBudget"

required

className={cn(inputClass, "appearance-none")}

&gt;

&lt;option value=""&gt;Select Project Budget&lt;/option&gt;

&lt;option value="10k-50k"&gt;$10k - $50k&lt;/option&gt;

&lt;option value="50k-100k"&gt;$50k - $100k&lt;/option&gt;

&lt;option value="100k-200k"&gt;$100k - $200k&lt;/option&gt;

&lt;option value="200k+"&gt;$200k+&lt;/option&gt;

&lt;/select&gt;

&lt;select

name="projectStatus"

required

className={cn(inputClass, "appearance-none")}

&gt;

&lt;option value=""&gt;Select Project Status&lt;/option&gt;

&lt;option value="planning"&gt;Planning&lt;/option&gt;

&lt;option value="in-progress"&gt;In Progress&lt;/option&gt;

&lt;option value="completed"&gt;Completed&lt;/option&gt;

&lt;/select&gt;

&lt;/div&gt;

&lt;textarea

name="message"

placeholder="Tell us about your project"

required

className={`${inputClass} min-h-[120px] resize-none py-3`}

/&gt;

&lt;label

htmlFor="photo"

className="flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-md border border-dashed border-[#595959] bg-[#333333] px-3 py-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] hover:border-[#C88719] hover:ring-2 hover:ring-[#C88719]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[50px] sm:px-4"

&gt;

&lt;FiUpload className="h-5 w-5" /&gt;

{photo ? photo.name : "Upload a project photo (optional)"}

&lt;/label&gt;

&lt;input

type="file"

id="photo"

ref={photoRef}

onChange={(e) =&gt; {

if (e.target.files &amp;&amp; e.target.files.length &gt; 0) {

setPhoto(e.target.files[0]);

}

}}

accept="image/*"

className="sr-only"

/&gt;

&lt;Button

type="submit"

className="h-11 rounded-md bg-[#C88719] text-white hover:bg-white hover:text-black focus:ring-2 focus:ring-[#C88719]/25 disabled:bg-white/25 disabled:text-white/50 sm:h-[50px]"

disabled={mutation.isLoading}

&gt;

{mutation.isLoading ? (

&lt;Loader2 className="mr-2 h-4 w-4 animate-spin" /&gt;

) : (

"Request a Quote"

)}

&lt;/Button&gt;

&lt;/form&gt;

&lt;/QueryClientProvider&gt;

);

  }
