const mailTemplate = (data) => {
  const Thead = ["Id", "Name", "Email", "Mobile Number", "Hobbies"]
    .map((item) => {
      return `<th style="border: 1px solid #ddd;padding: 8px;padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #1876d2;color: white;">${item}</th>`;
    })
    .join("");
  const stringHobbies = (hobbies) => {
    return hobbies
      .map((item) => {
        return `${item}<br></br>`;
      })
      .join("");
  };

  const records = data
    .map(({ item }, index) => {
      return `<tr><td style="border: 1px solid #ddd;padding: 8px;">${
        index + 1
      }</td><td style="border: 1px solid #ddd;padding: 8px;">${
        item.name
      }</td ><td td style="border: 1px solid #ddd;padding: 8px;">${
        item.email
      }</td><td style="border: 1px solid #ddd;padding: 8px;">${
        item.phone
      }</td><td style="border: 1px solid #ddd;padding: 8px;">${stringHobbies(
        item.hobbies
      )}</td></tr>`;
    })
    .join("");
  return `<table style="font-family: Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;"><tr>${Thead}</tr>${records}</table>`;
};

export default mailTemplate;
