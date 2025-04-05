'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-singlife-primary">About Singlife</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-singlife-secondary">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              Singlife is a leading financial services company in Singapore, committed to making financial services simple, accessible, and rewarding for everyone. We combine the best of technology and human expertise to create innovative solutions that help people achieve their financial goals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-singlife-secondary">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-6">
              To be the most trusted financial services platform in Asia, empowering millions of people to take control of their financial future through simple, accessible, and innovative solutions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-singlife-secondary">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">We constantly push boundaries to create better financial solutions for our customers.</p>
                </CardContent>
              </Card>
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">We build trust through transparency, integrity, and reliability in all our services.</p>
                </CardContent>
              </Card>
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Customer-Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">We put our customers at the heart of everything we do, ensuring their needs are met.</p>
                </CardContent>
              </Card>
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">We strive for excellence in all aspects of our business, from product development to customer service.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-singlife-secondary">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">Comprehensive insurance solutions tailored to your needs.</p>
                  <Button variant="outline" className="singlife-button-outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">Smart investment solutions to grow your wealth.</p>
                  <Button variant="outline" className="singlife-button-outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="singlife-card">
                <CardHeader>
                  <CardTitle className="text-singlife-primary">Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">Flexible savings plans to secure your future.</p>
                  <Button variant="outline" className="singlife-button-outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-singlife-secondary">Contact Us</h2>
            <div className="bg-white p-6 rounded-lg border border-singlife-primary">
              <p className="text-gray-700 mb-4">
                Have questions or need assistance? Our team is here to help you.
              </p>
              <Button className="singlife-button">
                Get in Touch
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 