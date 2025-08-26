import { StaticLayout } from '@/components/layout/StaticLayout'
import { pageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMetadata.terms()

export default function TermsPage() {
  return (
    <StaticLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using HaltType (&ldquo;the Service&rdquo;), you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              HaltType is a free online typing speed test service that allows users to measure their 
              typing speed (WPM - words per minute) and accuracy. The service includes various test 
              modes, difficulty levels, and statistical tracking features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily use HaltType for personal, non-commercial transitory 
              viewing only. This is the grant of a license, not a transfer of title, and under this 
              license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes and in a way that does not infringe 
              the rights of, restrict or inhibit anyone else&rsquo;s use and enjoyment of the Service. 
              Prohibited behavior includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Harassing or causing distress or inconvenience to any other user</li>
              <li>Transmitting obscene or offensive content</li>
              <li>Disrupting the normal flow of dialogue or otherwise acting in a manner that negatively affects other users</li>
              <li>Using automated scripts or bots to manipulate test results</li>
              <li>Attempting to gain unauthorized access to the Service or its related systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you create an account on our Service, you are responsible for maintaining the security 
              of your account and you are fully responsible for all activities that occur under the 
              account. You must immediately notify us of any unauthorized uses of your account or any 
              other breaches of security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are and will remain the 
              exclusive property of HaltType and its licensors. The Service is protected by copyright, 
              trademark, and other laws. Our trademarks and trade dress may not be used in connection 
              with any product or service without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information on this website is provided on an &ldquo;as is&rdquo; basis. To the fullest extent 
              permitted by law, this Company excludes all representations, warranties, conditions and 
              terms whether express or implied, statutory or otherwise. The Service is provided &ldquo;as is&rdquo; 
              and &ldquo;as available&rdquo; without any warranty or representations of any kind.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall HaltType, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses, resulting from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account and bar access to the Service immediately, 
              without prior notice or liability, under our sole discretion, for any reason whatsoever 
              and without limitation, including but not limited to a breach of the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
              HaltType operates, without regard to its conflict of law provisions. Our failure to 
              enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any 
              time. If a revision is material, we will provide at least 30 days notice prior to any 
              new terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our 
              website or social media channels.
            </p>
          </section>
        </div>
      </div>
    </StaticLayout>
  )
}