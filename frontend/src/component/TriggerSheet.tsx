import type { NodeKind, NodeMetaData } from "./CreateWorkFlow"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { PriceTriggerMetadata, SUPORTED_ASSETS, TimerNodeMetadata } from "../common/metadata"


const SUPORTED_TRIGGER = [{
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes"
}, {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Runs whenev the price goes abpve or below a certain number for an asset"
}]


export const TriggerSheet = ({ onSelect }: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
}) => {

    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    })
    const [selectedTrigger, setSelectedTrigger] = useState(SUPORTED_TRIGGER[0].id)

    return <Sheet open={true}>
        {/* <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
        </SheetTrigger> */}
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select Trigger</SheetTitle>
                <SheetDescription>
                    Select the type of trigger
                    {selectedTrigger}
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* <SelectLabel>Fruits</SelectLabel> */}
                                {SUPORTED_TRIGGER.map(({ id, title }) => <>
                                    {/* <SelectLabel>{title}</SelectLabel> */}
                                    <SelectItem key={id} value={id}>{title}</SelectItem>
                                </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {selectedTrigger === "timer" && <div>
                        Nmber of second after which to run the timer
                        <Input value={metadata.time} onChange={(e) => setMetadata(metadata => ({
                            ...metadata,
                            time: Number(e.target.value)
                        }))}></Input>
                    </div>}

                    {selectedTrigger === "price-trigger" && <div>
                        Price: <Input type="text" onChange={(e) => setMetadata(m => ({
                            ...m,
                            price: Number(e.target.value)
                        }))}/>

                        Asset
                        <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
                            ...metadata,
                            asset: value
                        }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a asset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPORTED_ASSETS.map((id) => <>
                                        <SelectItem key={id} value={id}>{id}</SelectItem>
                                    </>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>}

                </SheetDescription>
            </SheetHeader>

            <SheetFooter>
                <Button onClick={() => {
                    onSelect(
                        selectedTrigger, metadata
                    )
                }}
                    type="submit">Create Trigger</Button>

                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>

}