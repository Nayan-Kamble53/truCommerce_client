import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Typography } from "@material-tailwind/react"

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="grid grid-cols-[3fr_7fr] gap-5">
          <img src="https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D" 
          className=""></img>
          <div>
            <Typography>product.name</Typography> 
            <CardDescription>product.desc</CardDescription>
            <Typography>product.price</Typography> 
          </div>
        </div>
      </CardHeader>
      {/* <CardContent>
        <p>Price: $99.0</p>
      </CardContent> */}
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}
