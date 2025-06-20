import benefitOneImg from "@/public/img/benefit-one.png";
import benefitTwoImg from "@/public/img/benefit-two.png";
import { AudioLines, ChartNoAxesCombined, LaptopMinimal, MessageSquare, Moon, TabletSmartphone } from "lucide-react";

const benefitOne = {
  title: "Highlight your benefits",
  desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Understand your customers",
      desc: "Then explain the first point breifly in one or two lines.",
      icon: <AudioLines/>,
    },
    {
      title: "Improve acquisition",
      desc: "Here you can add the next benefit point.",
      icon: <ChartNoAxesCombined/>,
    },
    {
      title: "Drive customer retention",
      desc: "This will be your last bullet point in this section.",
      icon: <MessageSquare/>,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Tuniform is designed as a mobile first responsive template.",
      icon: <TabletSmartphone/>,
    },
    {
      title: "Your Application",
      desc: "This Application is powered by latest technologies and tools.",
      icon: <LaptopMinimal/>,
    },
    {
      title: "Dark & Light Mode",
      desc: "Tuniform comes with a zero-config light & dark mode. ",
      icon: <Moon/>,
    },
  ],
};


export { benefitOne, benefitTwo };
