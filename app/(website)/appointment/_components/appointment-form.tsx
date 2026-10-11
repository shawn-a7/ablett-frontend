"use client";

import {
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AppointmentDatePicker from "./appointment-date-picker";
import AppointmentTimePicker,
 {
  type AppointmentSlot,
 } from "./appointment-time-picker";

type AppointmentFieldProps = InputHTMLAttributes&lt;HTMLInputElement&gt; & {
  label: string;
  icon?: ReactNode;
};

const inputClass =
  "h-[50px] w-full rounded-md border border-[#595959] bg-[#303030] px-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

type SlotsResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: AppointmentSlot[];
};

export default function AppointmentForm() {
  const { data: session } = useSession();
  const [date, setDate] = useState&lt;Date | undefined&gt;(undefined);
  const [time, setTime] = useState&lt;string | undefined&gt;(undefined);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slots, setSlots] = useState&lt;AppointmentSlot[]&gt;([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = useMemo(() =&gt; {
    if (!email) return true;
    return email.includes('@') &amp;&amp; email.includes('.');
  }, [email]);

  const isValidPhone = useMemo(() =&gt; {
    if (!phone) return true;
    return phone.length &gt;= 10 &amp;&amp; /^[0-9]+$/.test(phone);
  }, [phone]);

  const isFormValid = useMemo(() =&gt; {
    return (
      firstName &amp;&amp;
      lastName &amp;&amp;
      isValidEmail &amp;&amp;
      isValidPhone &amp;&amp;
      date &amp;&amp;
      time &amp;&amp;
      slots.length &gt; 0
    );
  }, [firstName, lastName, isValidEmail, isValidPhone, date, time, slots]);

  useEffect(() =&gt; {
    const fetchSlots = async () =&gt; {
      if (!date) return;
      setLoadingSlots(true);
      try {
        const response = await fetch('/api/appointment/slots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: date.toISOString() }),
        });
        const data: SlotsResponse = await response.json();
        if (data.success &amp;&amp; data.data) {
          setSlots(data.data);
        } else {
          toast.error(data.message || 'Failed to fetch slots');
        }
      } catch (error) {
        toast.error('An error occurred while fetching slots.');
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [date]);

  const handleSubmit = async (e: FormEvent&lt;HTMLFormElement&gt;) =&gt; {
    e.preventDefault();
    if (!isFormValid) {
      toast.error('Please fill in all fields correctly.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          date: date!.toISOString(),
          time: time!,
          userId: session?.user?.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Appointment booked successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setDate(undefined);
        setTime(undefined);
        setSlots([]);
        (globalThis as typeof globalThis &amp; { gtag?: (...args: unknown[]) =&gt; void }).gtag?.(
          "event",
          "conversion",
          { send_to: "AW-18374418828/aI3mCOqr4t4cEIzDzblE" }
        );
      } else {
        toast.error(data.message || 'Failed to book appointment.');
      }
    } catch (error) {
      toast.error('An error occurred while booking appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4"&gt;
      &lt;div className="grid grid-cols-1 gap-4 sm:grid-cols-2"&gt;
        &lt;AppointmentField
          label="First Name"
          value={firstName}
          onChange={(e) =&gt; setFirstName(e.target.value)}
          required
        /&gt;
        &lt;AppointmentField
          label="Last Name"
          value={lastName}
          onChange={(e) =&gt; setLastName(e.target.value)}
          required
        /&gt;
      &lt;/div&gt;
      &lt;div className="grid grid-cols-1 gap-4 sm:grid-cols-2"&gt;
        &lt;AppointmentField
          label="Email"
          type="email"
          value={email}
          onChange={(e) =&gt; setEmail(e.target.value)}
          required
          error={!isValidEmail}
          errorMessage="Please enter a valid email address."
        /&gt;
        &lt;AppointmentField
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) =&gt; setPhone(e.target.value)}
          required
          error={!isValidPhone}
          errorMessage="Phone number must be at least 10 digits."
        /&gt;
      &lt;/div&gt;

      &lt;AppointmentDatePicker date={date} setDate={setDate} /&gt;

      {loadingSlots ? (
        &lt;div className="flex items-center justify-center"&gt;
          &lt;Loader2 className="h-6 w-6 animate-spin" /&gt;
        &lt;/div&gt;
      ) : (
        slots.length &gt; 0 &amp;&amp; (
          &lt;AppointmentTimePicker
            slots={slots}
            time={time}
            setTime={setTime}
            date={date}
          /&gt;
        )
      )}

      &lt;Button type="submit" disabled={!isFormValid || loading} className="mt-4 w-full sm:w-auto"&gt;
        {loading ? (
          &lt;&gt;
            &lt;Loader2 className="mr-2 h-4 w-4 animate-spin" /&gt;
            Booking...
          &lt;/&gt;
        ) : (
          'Book Appointment'
        )}
      &lt;/Button&gt;
    &lt;/form&gt;
  );
}

function AppointmentField({ label, icon, ...props }: AppointmentFieldProps) {
  return (
    &lt;div className="flex flex-col gap-2"&gt;
      &lt;label htmlFor={label} className="text-sm font-medium text-white"&gt;
        {label}
      &lt;/label&gt;
      &lt;div className="relative"&gt;
        &lt;input id={label} className={inputClass} {...props} /&gt;
        {icon &amp;&amp; (
          &lt;div className="absolute inset-y-0 right-0 flex items-center pr-4"&gt;
            {icon}
          &lt;/div&gt;
        )}
      &lt;/div&gt;
      {props.error &amp;&amp; (
        &lt;p className="text-sm text-red-500"&gt;
          {props.errorMessage}
        &lt;/p&gt;
      )}
    &lt;/div&gt;
  );
          }
