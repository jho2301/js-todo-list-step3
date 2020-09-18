import {Component} from "../../core";
import {FilterTypes} from "../../constants";
import {todoOfTeamStore, SET_FILTER_TYPE, DELETE_ALL_ITEM} from "../../store/todoOfTeamStore";

const filterButtons = {
  [FilterTypes.ALL]: '전체보기',
  [FilterTypes.PRIORITY]: '우선 순위',
  [FilterTypes.ACTIVE]: '해야할 일',
  [FilterTypes.COMPLETED]: '완료한 일',
};

export const TodoListFooter = class extends Component {

  get #filterType () {
    return todoOfTeamStore.$state.filterType[this.$props.id];
  }

  get #filteredCount () {
    return todoOfTeamStore.$getters.membersByFilteredTodoList[this.$props.id].length;
  }

  render () {
    return `
      <span class="todo-count">총 <strong>${this.#filteredCount}</strong> 개</span>
      <ul class="filters">
        ${ Object.entries(filterButtons).map(([ type, text ]) => `
          <li>
            <a href="#" ${ this.#filterType === type ? ' class="selected"': '' } data-filter-type="${type}" data-ref="filter">${text}</a>
          </li>
        `).join('') }
      </ul>
      <button class="clear-completed" data-ref="delete-all">모두 삭제</button>
    `;
  }
  
  setEvent () {
    this.addEvent('filter', 'click', event => {
      event.preventDefault();
      todoOfTeamStore.commit(SET_FILTER_TYPE, {
        memberId: this.$props.id,
        filterType: event.target.dataset.filterType
      })
    });
    this.addEvent('delete-all', 'click', event => {
      event.preventDefault();
      todoOfTeamStore.dispatch(DELETE_ALL_ITEM, this.$props.id);
    });
  }
}