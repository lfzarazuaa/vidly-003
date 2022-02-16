const Formatter = {
  formatAsList: (content, counter = Number) => <li key={counter}>{content}</li>,

  formatAsCompleteList: function (arr = Array, nullMsg) {
    if (arr.isArray || arr.length === 0) return nullMsg;
    return <ul>{arr.map(this.formatAsList)}</ul>;
  },

  formatAsTableRow: function (content, counter = Number) {
    const getElements = (prevElements) => {
      let acum = [];
      if (prevElements)
        acum = Array.isArray(prevElements) ? [...prevElements] : [prevElements];
      for (const key in content) {
        if (Object.hasOwnProperty.call(content, key) && key !== "_id") {
          const element = content[key];
          acum.push(<td key={acum.length + 1}>{element}</td>);
        }
      }
      return acum;
    };
    const firstElement = (
      <th key={1} scope="row">
        {++counter}
      </th>
    );
    return <tr key={counter}>{getElements(firstElement)}</tr>;
  },
};
export default Formatter;
