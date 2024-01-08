export const formDataExample = [
  {
    name: "form secction 1",
		isFormset:false,
    flexDirection: "column",
    fields: [
      {
        name: "campo_1",
        label: "campo 1",
				required: true,
        type: "string",
      },
      {
        name: "campo_2",
        label: "campo 2",
        type: "number",
        addonBefore: "+",
        addonAfter: "$",
      },
    ],
  },
  {
    name: "form secction 2",
    flexDirection: "row",
		isFormset:true,
    fields: [
      {
        name: "campo_3",
				required: true,
        label: "campo 3",
        type: "string",
      },
      {
        name: "campo_4",
        label: "campo 4",
        type: "select",
				mode:"multiple",
				style:{ width: 200 },
				placeholder:"Search to Select",
        options: [
          {
            value: "Not Identified",
            label: "Not Identified",
          },
          {
            value: "Closed",
            label: "Closed",
          },
          {
            value: "Communicated",
            label: "Communicated",
          },
          {
            value: "Identified",
            label: "Identified",
          },
          {
            value: "Resolved",
            label: "Resolved",
          },
          {
            value: "Cancelled",
            label: "Cancelled",
          },
        ],
      },
    ],
  },
];
