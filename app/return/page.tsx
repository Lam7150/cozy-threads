'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchSessionStatus } from '@/utils/api';

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetchSessionStatus(sessionId).then((data) => {
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    });
  }, []);

  if (status === 'open') {
    return <Link rel="noreferrer noopener" href="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section
        id="success"
        className="flex justify-center items-center p-4 min-h-screen bg-gray-50"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex flex-row justify-center items-center text-2xl font-bold text-center text-primary">
              <Image
                src="/cozy_threads.png"
                alt={`cozy threads logo`}
                sizes="10vw"
                layout="fit"
                objectFit="cover"
                width={64}
                height={64}
              />
              Thank You!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              We appreciate your business! A confirmation email will be sent to{' '}
              <span className="font-medium text-primary">{customerEmail}</span>.
            </p>
            <p className="mt-2 text-center text-muted-foreground">
              If you have any questions, please email{' '}
              <a
                href="mailto:orders@example.com"
                className="font-medium text-primary hover:underline"
              >
                orders@example.com
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return null;
}
