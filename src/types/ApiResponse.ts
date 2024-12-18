import { message } from "@/model/User";

export interface ApiResponse{
    SUCCESS : boolean;
    message : string;
    isAcceptingMessages ?: boolean;
    messages?: Array<message>
}