import React, { Component } from 'react';
import data from './data';

import './CustomSelect.css';

const tmp = [
  { id: 0, name: 'pedro', code: 'CA' },
  { id: 1, name: 'juan', code: 'US' },
  { id: 2, name: 'jhon', code: 'BO' },
];

export default class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selected: null,
      list: [],
      searchText: '',
    };
    this.openSelect = this.openSelect.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  componentDidMount() {
    const list = [];
    for (const [key, value] of Object.entries(data)) {
      /* console.log(`${key}: ${value}`); */
      const item = {
        codeName: key,
        name: value.name,
        code: value.code,
      };
      list.push(item);
    }

    this.setState({
      ...this.state,
      list,
    });
  }

  setSelected(item) {
    this.setState({
      ...this.state,
      selected: item,
    });
  }

  openSelect() {
    console.log('open');
    const { isOpen } = this.state;
    this.setState({
      ...this.state,
      isOpen: !isOpen,
    });
  }

  reset(e) {
    e.stopPropagation();
    this.setSelected(null);
  }

  getSelected() {
    const { selected } = this.state;
    if (selected) {
      return (
        <>
          <img src={'./svgs/' + selected.codeName + '.svg'} alt={selected.name} />
          <p>{selected.code}</p>
          <button type="button" onClick={(e) => this.reset(e)}>
            x
          </button>
        </>
      );
    } else {
      return <p>Select ...</p>;
    }
  }

  setSearchText(e) {
    this.setState({
      ...this.state,
      searchText: e.target.value,
    });
  }

  isOpenSelect() {
    const { isOpen } = this.state;
    if (isOpen) {
      return 'custom-select__content';
    } else {
      return 'custom-select__content hidden';
    }
  }

  render() {
    const { list, searchText } = this.state;
    const filteredList = list.filter((s) => {
        console.log(s.name);
        console.log(s.name.toUpperCase().indexOf(searchText));
        return s.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1;
    });
    return (
      <ul className="custom-select">
        <li className="custom-select__chosen" onClick={this.openSelect}>
          {this.getSelected()}
        </li>
        <div className={this.isOpenSelect()}>
          <div className="custom-select__searcher">
            <input
                name="searcher"
                type="text"
                onKeyUp={(e) => this.setSearchText(e)}
            />
          </div>
          <div className="custom-select__list">
            {filteredList &&
                filteredList.map((item) => (
                <li key={item.codeName} onClick={() => this.setSelected(item)}>
                    <img src={'./svgs/' + item.codeName + '.svg'} alt={item.name} />
                    <span>{item.name}</span>
                    <p>{item.code}</p>
                </li>
                ))}
          </div>
        </div>
      </ul>
    );
  }
}
