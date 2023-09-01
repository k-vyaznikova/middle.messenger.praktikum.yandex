import {Block} from "/utils/block.ts";
import template from "/pages/community/community.hbs";
import img from "/img/noimgprofile.svg";

export class CommunityPage extends Block {
	constructor() {
		super({
			title: "Иван",
			submit_url: "#",
			profile_photo: {
				profilePhoto: img,
				profileAlt: "Иван"
			},
			profile_items: [
				{
					infoLabel: "Назване чата",
					infoType: "text",
					infoName: "name",
					value: "Соседи",
					validate_type: "not-empty",
					ref: "input_name"
				},
				{
					infoLabel: "Краткое описание чата",
					infoPlaceholder: "Коротко расскажите об этом чате...",
					infoType: "textarea",
					infoName: "description",
					value: "Соо. бщество неравнодушных соседей МКР Цветы. Все ваши соседи общаются здесь. Нас уже 11 000 000. Начать беслатно. Соседи — социальная сеть жильцов для общения и решения бытовых вопросов. Нас топит 16 этаж. Антон К. ... Вы можете написать любому соседу в вашем доме, просто зная его номер квартиры. 2 кв. Артём.",
					validate_type: "",
					ref: "textarea_description"
				}
			],
			member_list: [
				{
					memberLink: "#",
					memberPhoto: img,
					memberLogin: "ivanova",
					memberName: "Иванова Юлия"
				},
				{
					memberLink: "#",
					memberPhoto: img,
					memberLogin: "ivanova",
					memberName: "Фива Лев"
				},
				{
					memberLink: "#",
					memberPhoto: img,
					memberLogin: "ivanova",
					memberName: "Пивоваров Олег"
				},
				{
					memberLink: "#",
					memberPhoto: img,
					memberLogin: "ivanova",
					memberName: "Иванова Юлия"
				},
				{
					memberLink: "#",
					memberPhoto: img,
					memberLogin: "ivanova",
					memberName: "Фива Лев"
				},
				{
					memberLink: "#",
					memberPhoto: img,
					memberLogin: "ivanova",
					memberName: "Пивоваров Олег"
				}

			]
		});
	}
	render() {
		return this.compile(template, this.props);
	}
}
