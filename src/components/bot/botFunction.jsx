import { ProductCardRow } from "@/components/bot/botComponent";
import OrderProgressComponent from "@/components/bot/OrderProgressComponent";
export function handleIntentResponse(
  intentResponse,
  response,
  setConversation,
  products
) {
  switch (intentResponse) {
    case "show.product":
      setConversation((prevConversation) => [
        ...prevConversation,
        { by: "bot", message: response.data.fulfillmentText },
        { message: <ProductCardRow products={products} /> },
      ]);
      break;
    case "recommend.product.by.catagory":
      const categories =
        response.data.parameters.fields.category.listValue.values;
      const categoryNames = categories.map((category) => category.stringValue);
      const filteredProducts = products.filter((product) =>
        product.categories.some((category) => categoryNames.includes(category))
      );

      if (filteredProducts.length === 0) {
        setConversation((prevConversation) => [
          ...prevConversation,
          { by: "bot", message: "sorry, we don't have that product in category yet" },
        ]);
      } else {
        setConversation((prevConversation) => [
          ...prevConversation,
          { by: "bot", message: `yes, we have ${categoryNames.join(", ")}` },
        ]);
        setConversation((prevConversation) => [
          ...prevConversation,
          { message: <ProductCardRow products={filteredProducts} /> },
        ]);
      }
      break;
    case "recommend.product":
      const recommendedProducts = products.filter(
        (product) => product.averageRating > 3
      );
      if (recommendedProducts.length === 0) {
        setConversation((prevConversation) => [
          ...prevConversation,
          { by: "bot", message: "Sorry, we dont have product for recommend." },
        ]);
      } else {
        setConversation((prevConversation) => [
          ...prevConversation,
          { by: "bot", message: response.data.fulfillmentText },
          { message: <ProductCardRow products={recommendedProducts} /> },
        ]);
      }
      break;
    case "order.id":
      const keywords = ["pending", "approved", "shipping", "delivered"];
      const statusShipping = keywords.find((keyword) =>
        response.data.fulfillmentText.includes(keyword)
      );

      let progressValue;

      switch (statusShipping) {
        case "pending":
          progressValue = 0;
          break;
        case "approved":
          progressValue = 35;
          break;
        case "delivered":
          progressValue = 100;
          break;
        case "shipping":
          progressValue = 65;
          break
        default:
          progressValue = 0; // Set a default value if the status is not recognized
      }

      if (statusShipping) {
        setConversation((prevConversation) => [
          ...prevConversation,
          { by: "bot", message: response.data.fulfillmentText },
          { message: <OrderProgressComponent value={progressValue} /> },
        ]);
      } else {
        setConversation((prevConversation) => [
          ...prevConversation,
          { by: "bot", message: response.data.fulfillmentText },
        ]);
      }

      break;

    default:
      const botResponse = response.data.fulfillmentText;
      setConversation((prevConversation) => [
        ...prevConversation,
        { by: "bot", message: botResponse },
      ]);
  }
}
