"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)
    
    return (
      <div
        ref={ref}
        className={cn("", className)}
        data-active-tab={activeTab}
        {...props}
      />
    )
  }
)
Tabs.displayName = "Tabs"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const parentTabs = React.useContext(TabsContext)
    const isActive = parentTabs?.activeTab === value
    
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          isActive && "bg-background text-foreground shadow-sm",
          className
        )}
        onClick={() => parentTabs?.setActiveTab(value)}
        data-state={isActive ? "active" : "inactive"}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const parentTabs = React.useContext(TabsContext)
    const isActive = parentTabs?.activeTab === value
    
    if (!isActive) return null
    
    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        data-state={isActive ? "active" : "inactive"}
        {...props}
      />
    )
  }
)
TabsContent.displayName = "TabsContent"

// Context for tabs
interface TabsContextType {
  activeTab: string | undefined
  setActiveTab: (value: string) => void
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

// Wrap the Tabs component to provide context
const TabsWithContext = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultValue, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)
    
    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <Tabs ref={ref} defaultValue={defaultValue} {...props}>
          {children}
        </Tabs>
      </TabsContext.Provider>
    )
  }
)
TabsWithContext.displayName = "TabsWithContext"

export { TabsWithContext as Tabs, TabsList, TabsTrigger, TabsContent } 