import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "~/components/shadcn/pagination";

interface PaginationProps {
    limit: number;
    offset: number;
    totalRows: number;
    setOffset: (newOffset: number) => void;
}

export default function PaginationTable({limit, offset, totalRows, setOffset}: PaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => {
                        if (offset > 0) {
                            setOffset(offset - 1);
                        }
                    }}/>
                </PaginationItem>
                {Array.from({length: Math.ceil(totalRows / limit)}, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={index === offset}
                            className={index === offset ? "bg-blue-500 text-white" : ""}
                            onClick={() => setOffset(index)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => {
                        if (offset < Math.ceil(totalRows / limit) - 1) {
                            setOffset(offset + 1);
                        }
                    }}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
