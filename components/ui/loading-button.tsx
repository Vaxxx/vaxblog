import {Button, ButtonProps} from "@/components/ui/button";
import {AiOutlineLoading} from "react-icons/ai";

type LoadingButtonProps = {
    loading: boolean
} & ButtonProps

const LoadingButton = ({children, loading, ...props} : LoadingButtonProps) => {
    return(
        <Button {...props} disabled={props.disabled || loading}>
            {
                loading &&
                   <AiOutlineLoading className={"mr-2 h-4 w-4 animate-spin"}/>
            }
            {children}
        </Button>
    )
}

export default LoadingButton;