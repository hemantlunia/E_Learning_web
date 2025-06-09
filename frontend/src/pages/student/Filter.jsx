/* eslint-disable no-unused-vars */
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "nextjs", label: "Next Js" },
  { id: "js", label: "JavaScript" },
];

function Filter({handleFilterChange}) {
     const [selectedCategories, setSelectedCategories] = useState([]);
      const [sortByPrice, setSortByPrice] = useState("");
    const handleCategoryChange = (catId)=>{
        setSelectedCategories((prev)=>{
            const newCategories = prev.includes(catId) ? prev.filter((id)=> id !== catId) : [...prev,catId];
            handleFilterChange(newCategories,sortByPrice)
            return newCategories;
        })
    };

    const selectByPriceHandler = (selectedValue)=>{
        setSortByPrice(selectedValue);
        handleFilterChange(selectedCategories,selectedValue)
    }
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By Price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">Category</h1>
        {
            categories.map((cat)=>(
                <div className="flex items-center space-x-2 my-2">
                    <Checkbox id={cat.id} onCheckedChange={()=>handleCategoryChange(cat.id)}/>
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {
                                cat.label
                            }
                        </Label>
                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Filter;
