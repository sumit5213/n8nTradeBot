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
import { SUPORTED_ASSETS, TradingMetadata } from "../common/metadata"

const SUPORTED_ACTIONS = [{
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on hyperliquid"
}, {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on backpack"
}, {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on lighter"
}]

export const ActionSheet = ({ onSelect }: {
    onSelect: (kind: NodeKind, metaData: NodeMetaData) => void
}) => {

    const [metadata, setMetadata] = useState<TradingMetadata | {}>({})
    const [selectedAction, setSelectedAction] = useState(SUPORTED_ACTIONS[0].id)

    return <Sheet open={true}>
        {/* <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
        </SheetTrigger> */}
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select Action</SheetTitle>
                <SheetDescription>
                    Select the type of action
                    {/* {selectedAction} */}
                    <Select value={selectedAction} onValueChange={(value) => setSelectedAction(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPORTED_ACTIONS.map(({ id, title }) => <>
                                    <SelectItem key={id} value={id}>{title}</SelectItem>
                                </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    
                    {(selectedAction === "hyperliquid" || selectedAction === "lighter" || selectedAction === "backpack") && <div>
                        <div className="pt-4">
                            Type
                        </div>

                        <Select value={metadata?.type} onValueChange={(value) => setMetadata(metadata => ({
                            ...metadata,
                            type: value
                        }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a asset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={"long"}>LONG</SelectItem>
                                    <SelectItem value={"short"}>SHORT</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="pt-4">
                            Symbol
                        </div>

                        <Select value={metadata?.symbol} onValueChange={(value) => setMetadata(metadata => ({
                            ...metadata,
                            symbol: value
                        }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a symbol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPORTED_ASSETS.map(asset=> <SelectItem key={asset} value={asset}>{asset}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>


                        <div className="pt-4">
                            Qty
                        </div>
                        <Input type="number" value={metadata.qty} onChange={(e) => setMetadata(metadata => ({
                            ...metadata,
                            qty: Number(e.target.value)
                        }))}></Input>
                    </div>}

                </SheetDescription>
            </SheetHeader>

            <SheetFooter>
                <Button onClick={() => {
                    onSelect(
                        selectedAction,
                         metadata
                    )
                }}
                    type="submit">Create Action</Button>

                <SheetClose asChild >
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>

}