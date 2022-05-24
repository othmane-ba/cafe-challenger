import Layout from '../components/Layout'
import MyButton from '../components/MyButton'
import FormItem from '../utils/FormItem'


export default function order() {
  return (
    <Layout title="Order Now" subtitle="Free and Fast">
      <div className="container-wrapper flex h-full items-center justify-center py-7">
        <form className="grid grid-cols-2 md:grid-cols-1 gap-5 border border-gray-300 shadow-lg p-6 rounded-md max-w-4xl w-full">
          <FormItem 
            labelText="Your Name"
            inputType="text"
            inputPlaceholder="enter your name"
          />
          <FormItem 
            labelText="Your Number"
            inputType="tel"
            inputPlaceholder="enter your number"
          />
          <FormItem 
            labelText="Your Order"
            inputType="text"
            inputPlaceholder="enter food name"
          />
          <FormItem 
            labelText="Additional Food"
            inputType="text"
            inputPlaceholder="extra with food"
          />
          <FormItem 
            labelText="How Much"
            inputType="number"
            inputPlaceholder="how many orders"
            min={0}
          />
          <FormItem 
            labelText="Date And Time"
            inputType="date"
          />
          <FormItem 
            labelText="Your Address"
            inputPlaceholder="enter your address"

          />
          <FormItem 
            labelText="Your Message"
            inputPlaceholder="enter your message"
          />
          
          <MyButton text="Order Now" className="w-20"/>
        </form>
      </div>
    </Layout>
  )
}
