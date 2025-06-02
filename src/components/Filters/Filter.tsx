import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

const FilterSidebar = ({ filters }: { filters: Record<string, string[]> }) => {
  return (
    <div className="p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {Object.entries(filters).map(([category, options]) => (
        <div key={category} className="mb-4">
          <details className="group">
            <summary className="cursor-pointer flex justify-between items-center font-medium text-gray-900">
              {category} <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 pl-2">
              {options.map((option) => (
                <label key={option} className="flex items-center space-x-2 my-1">
                  <input type="checkbox" value={option} className="accent-black" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  )
}

export default function FilterComponent() {
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  useEffect(() => {
    
    const fetchFilters = async () => {
      const res = await fetch("/api/filters?productType=clothing")
      const data = await res.json()
      setFilters(data)
    }

    fetchFilters()
  }, [])

  const commonFilters = ["Price", "Color", "Gender"]

  return (
    <div className="flex items-center justify-between gap-2 p-4 flex-wrap">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">All Filters</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <FilterSidebar filters={filters} />
        </SheetContent>
      </Sheet>

      {/* Common predefined filters */}
      {commonFilters.map((filterKey) => (
        <div key={filterKey} className="w-40">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={filterKey} />
            </SelectTrigger>
            <SelectContent>
              {(filters[filterKey] || []).map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      {/* Dynamic filter categories */}
      {Object.keys(filters)
        .filter((key) => !commonFilters.includes(key))
        .map((category) => (
          <div key={category} className="w-40">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={category} />
              </SelectTrigger>
              <SelectContent>
                {filters[category].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

      {/* Sort by dropdown */}
      <div className="ml-auto w-40">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Featured Items" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured Items</SelectItem>
            <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="high-to-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}