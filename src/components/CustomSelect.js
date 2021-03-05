import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import data from './data';

import './CustomSelect.css';

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
    this.setSearchText = this.setSearchText.bind(this);
    this.customSelectReference = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.listenerCustomSelect.bind(this));
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

    this.setState((prevState) => ({
      ...prevState,
      list,
    }));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.listenerCustomSelect.bind(this));
  }

  setSelected(item) {
    const { handleChange } = this.props;
    const data = { name: 'code', value: item };
    handleChange({ target: data });
    this.setState((prevState) => (
      {
        ...prevState,
        selected: item,
        isOpen: false,
      }
    ));
  }

  getSelected() {
    const { selected } = this.state;
    if (selected) {
      return (
        <>
          <img
            src={`/svgs/${selected.codeName}.svg`}
            alt={selected.name}
          />
          <p>{selected.code}</p>
          <button type="button" onClick={(e) => this.reset(e)}>
            x
          </button>
        </>
      );
    }
    return <p>Select ...</p>;
  }

  setSearchText(e) {
    const { value = '' } = e.target; // <-- moved outside asynchronous context
    if (value || value === '') {
      console.log(value);
      this.setState((prevState) => (
        {
          ...prevState,
          searchText: value,
        }
      ));
    } else {
      console.log('no tiene value');
    }
  }

  listenerCustomSelect(event) {
    if (!this.customSelectReference.current
      || this.customSelectReference.current.contains(event.target)) {
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  }

  reset(e) {
    e.stopPropagation();
    this.setSelected(null);
  }

  openSelect() {
    const { isOpen } = this.state;
    this.setState((prevState) => (
      {
        ...prevState,
        isOpen: !isOpen,
      }
    ));
  }

  isOpenSelect() {
    const { isOpen } = this.state;
    if (isOpen) {
      return 'custom-select__content';
    }
    return 'custom-select__content hidden';
  }

  render() {
    const { list, searchText } = this.state;
    const filteredList = list.filter((s) => (
      s.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1));
    return (
      <ul className="custom-select" ref={this.customSelectReference}>
        <li className="custom-select__chosen" onClick={this.openSelect}>
          {this.getSelected()}
        </li>
        <div className={this.isOpenSelect()}>
          <div className="custom-select__searcher">
            <input
              name="searcher"
              type="text"
              value={searchText}
              onChange={this.setSearchText}
              autocomplete="off"
            />
            <span><FontAwesomeIcon icon={faSearch} /></span>
          </div>
          <div className="custom-select__list">
            {filteredList
              && filteredList.map((item) => (
                <li key={item.codeName} onClick={() => this.setSelected(item)}>
                  <img
                    src={`/svgs/${item.codeName}.svg`}
                    alt={item.name}
                  />
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
