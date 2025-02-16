import { message } from "antd";
import { useState } from "react";

interface FormData {
  [key: string]: string;
}

export default function Test() {
  const [gen, setGen] = useState<string>("");
  const [class_, setClass_] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({});

  // URL gửi dữ liệu
  const formActionUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScm0HUFvlsLKhDIHvNyafRB3VCe5diYEcfPQcHwIvTtlKFEIw/formResponse";

  // ID và giá trị của các input trong Google Form
  const fieldGen = "entry.1553696695";
  const valueGen = ["Nam", "Nữ"];
  const fieldClass = "entry.83825389";
  const valueClass = ["Lớp 10", "Lớp 11", "Lớp 12"];
  
  const fieldIDs: string[] = [
    "entry.1908337107", "entry.1475808412", "entry.503975889", "entry.540072525",
    "entry.1831056979", "entry.1890653481", "entry.1237669362", "entry.916497519",
    "entry.266801085", "entry.1980051388", "entry.973005110", "entry.1481630245",
    "entry.798879414", "entry.270403494", "entry.911839445", "entry.152439334",
    "entry.706733423", "entry.975034231", "entry.328899042", "entry.69694355",
    "entry.2096911660", "entry.331822125", "entry.328691753", "entry.10194864",
    "entry.761405648", "entry.1744201262", "entry.2126912360", "entry.1341088284",
    "entry.767669527", "entry.1308807324", "entry.1508458392", "entry.1013052191",
    "entry.1001265233", "entry.701982219", "entry.463751979", "entry.406902621",
    "entry.317263609", "entry.924040277", "entry.104094270", "entry.1085751240"
  ];
  
  const randomChoices = ["Hoàn toàn đồng ý", "Đồng ý", "Không đồng ý", "Rất không đồng ý"];

  // Hàm chọn ngẫu nhiên một giá trị từ danh sách
  const getRandomValueFromArray = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

  // Hàm tạo dữ liệu ngẫu nhiên
  const generateRandomData = () => {
    const randomData: FormData = {
      [fieldGen]: getRandomValueFromArray(valueGen),
      [fieldClass]: getRandomValueFromArray(valueClass),
    };

    fieldIDs.forEach((field) => {
      randomData[field] = getRandomValueFromArray(randomChoices);
    });

    setGen(randomData[fieldGen]);
    setClass_(randomData[fieldClass]);
    setFormData(randomData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    fetch(formActionUrl, {
      method: "POST",
      body: formDataToSend,
      mode: "no-cors",
    })
      .then(() =>{
        message.success("Đã gửi!");
        generateRandomData();
      })
      .catch(() => alert("Lỗi gửi form!"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Tự động điền Google Form</h2>
      <button
        onClick={generateRandomData}
        className="bg-green-500 text-white p-2 rounded w-full mb-3"
      >
        Random Dữ Liệu
      </button>

      <form onSubmit={handleSubmit} className="space-y-3">
      <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Gửi Form
        </button>
        <div className="border p-2 w-full">Gen: {gen}</div>
        <div className="border p-2 w-full">Class: {class_}</div>
        

        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="border p-2 w-full">
            {key}: {value}
          </div>
        ))}

        
      </form>
    </div>
  );
}
