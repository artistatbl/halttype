import { StaticLayout } from '@/components/layout/StaticLayout'

export default function AboutPage() {
  return (
    <StaticLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About HaltType</h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is HaltType?</h2>
            <p className="text-muted-foreground leading-relaxed">
              HaltType is a free, modern online typing speed test designed to help you measure and improve 
              your typing skills. Whether you&rsquo;re a student, professional, or just someone looking to enhance 
              your keyboard proficiency, HaltType provides accurate WPM (words per minute) measurements 
              and detailed statistics to track your progress.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that typing is a fundamental skill in today&rsquo;s digital world. Our mission is to 
              provide a clean, distraction-free environment where anyone can test and improve their typing 
              speed and accuracy without any barriers or registration requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Real-time WPM and accuracy calculation</li>
              <li>Multiple test modes: time-based, word count, and quotes</li>
              <li>Adjustable difficulty levels</li>
              <li>Clean, minimalist interface</li>
              <li>No registration required</li>
              <li>Completely free to use</li>
              <li>Mobile-friendly design</li>
              <li>Detailed typing statistics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose HaltType?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unlike other typing tests that are cluttered with ads or require sign-ups, HaltType focuses 
              on what matters most: providing an accurate, reliable typing test experience. Our algorithm 
              ensures precise WPM calculations and our interface is designed to minimize distractions, 
              allowing you to focus entirely on improving your typing skills.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy & Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              We respect your privacy. HaltType doesn&rsquo;t track personal information or store your typing 
              data unless you explicitly choose to create an account. All test results are processed 
              locally in your browser, ensuring your privacy is maintained.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              Have questions, suggestions, or feedback? We&rsquo;d love to hear from you! You can reach us 
              through our social media channels or by creating an issue on our GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </StaticLayout>
  )
}