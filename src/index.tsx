import { Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { CustomerData } from "./models/customer_inteface"

export default function Command() {
  const { isLoading, data, error } = useFetch<CustomerData>("http://127.0.0.1:3000/api/v1/customers"); 
  console.log(data)

  if (isLoading) {
     return <Detail markdown={`Loading...`} />;
  }

  if (error) {
    return <Detail markdown={`Error: ${error.message}`} />;
  }

  if (!data) {
    return <Detail markdown="No data found" />;
  } 
  
  const { status, message, data: customerInfo }= data;
  
  return (
    <Detail
      markdown={`Status: ${status}\n\nMessage: ${message} \n\n Details: ${customerInfo}`}
    />
  );
}
