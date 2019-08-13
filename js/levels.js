export function changeLevel(level, playerName = null) {
	$('#main-area').hide('swing', () => {
		$('#level-name').html(level.levelName);
		if (playerName) {
			$('.player-name').html(playerName);
		}			
		$('#level-description').html(level.levelDescription);
		$('#main-area').show({
			duration: 500,
			easing: 'swing',
		});
		$('.instructions-p-holder').css('display', level.displayInstructions);
		$('#level-instructions').html(level.instructions);
		$('#robots-area').css('display', level.robotsArea);
		level.setListeners();
	});
}

function moveRobots(initOne, initTwo, limit) {
	$('.crew-1').css('animation', 'moveOne 1s steps(8) infinite');
				$('.crew-2').css('animation', 'moveTwo 1s steps(8) infinite');

				let moveTimer = setInterval(() => {
					initOne += 0.5;
					initTwo += 0.5;
					$('.crew-1').css('left', `${initOne}%`);
					$('.crew-2').css('left', `${initTwo}%`);

					if (initTwo == limit) {
						$('.crew-1').css('animation', 'crewOne 0.5s steps(4) infinite');
						$('.crew-2').css('animation', 'crewTwo 0.5s steps(4) infinite');
						clearInterval(moveTimer);
					}
				}, 1000/ 30); // 60 steps/sec
}

export const entry_level = {
	levelName: 'Computer Quest',
	levelDescription: `
	<div class="actors-holder">
		<div class="main-actor actor"></div>
		<div class="crew-one-actor actor"></div>
		<div class="crew-two-actor actor"></div>
	</div>
	<p class="text-centered">Приветствую тебя в интерактивном веб-квесте Computer Quest.</p>
	<p class="text-centered">В процессе игры ты познакомишься с основными направлениями компьютерных наук. Тебе предстоит узнать много нового.</p>
	<p class="text-centered">Для начала игры вводи свое имя и жми начать игру.</p>
	<div class="start-game-block">
		<input id="player-name-holder" type="text" placeholder="Имя..." />
		<button id="start-game-btn" disabled="true">Начать игру</button>
	</div>`,
	robotsArea:  'none',
	setListeners() {

		$('.close-modal-screen').click(event => {
			$('.modal-screen').hide('swing');
			$('#blur').hide();
		});

		$('#start-game-btn').click(event => {
			if (!$('#start-game-btn').attr('disabled')) {
				const playerName = $('#player-name-holder').val();
				changeLevel(briefing_level, playerName);
			}
		});

		$('#player-name-holder').keyup(event => {
			if ($('#player-name-holder').val().length == 0 || $('#player-name-holder').val().length > 16) {
				$('#start-game-btn').attr('disabled', true);
				return;
			}
			$('#start-game-btn').removeAttr('disabled');
		});
	},
	displayInstructions: 'none',
	instructions: '',
};

export const briefing_level = {
	levelName: 'Привет, <span class="player-name">playerName</span>.',
	levelDescription: `
			<div class="main-actor"></div>
			<p>Космический корабль получил критические повреждения, в результате чего некоторые системы перестали функционировать, 
				а вся команда оказалась заперта в нижнем отсеке корабля.
			</p>
			<p>Твоя задача - восстановить поврежденные модули корабля и освободить экипаж.</p>
			<div class="start-game-block">
				<button class="ready-btn">Я готов!</button>
			</div>`,
	robotsArea: `block`,
	setListeners() {
		$('.ready-btn').click(event => {	
			changeLevel(level_1);
		});
	},
	displayInstructions: 'none',
	instructions: '',
};

export const level_1 = {
	levelName: 'Уровень 1. Криптография',
	levelDescription: `	<p>Чтобы получить удаленный доступ к модулям корабля, необходимо войти в систему. Хотя пароль
	в явном виде не хранится в базе данных корабля, можно легко получить его в зашифрованном виде. 
	База данных корабля подсказывает, что кодирование производилось с помощью шифра Цезаря со сдвигом на 3.
	Таким образом, для авторизации в системе корабля необходимо расшифровать следующее слово:
</p>
<h2 class="encrypted-text" style="text-align: center">РГЕЦШСЖСРСФСУ</h2>
<p>Для удобства  ниже представлен русский алфавит:</p>
<table class="alphabet">
	<tr>
		<td>1</td> <td>А</td>
		<td>5</td> <td>Д</td>
		<td>9</td> <td>З</td>
		<td>13</td> <td>Л</td>
		<td>17</td> <td>П</td>
		<td>21</td> <td>У</td>
		<td>25</td> <td>Ч</td>
		<td>29</td> <td>Ы</td>
		<td>33</td> <td>Я</td>
	</tr>
	<tr>
		<td>2</td> <td>Б</td>
		<td>6</td> <td>Е</td>
		<td>10</td> <td>И</td>
		<td>14</td> <td>М</td>
		<td>18</td> <td>Р</td>
		<td>22</td> <td>Ф</td>
		<td>26</td> <td>Ш</td>
		<td>30</td> <td>Ь</td>
	</tr>
	<tr>
		<td>3</td> <td>В</td>
		<td>7</td> <td>Ё</td>
		<td>11</td> <td>Й</td>
		<td>15</td> <td>Н</td>
		<td>19</td> <td>С</td>
		<td>23</td> <td>Х</td>
		<td>27</td> <td>Щ</td>
		<td>31</td> <td>Э</td>
	</tr>
	<tr>
		<td>4</td> <td>Г</td>
		<td>8</td> <td>Ж</td>
		<td>12</td> <td>К</td>
		<td>16</td> <td>О</td>
		<td>20</td> <td>Т</td>
		<td>24</td> <td>Ц</td>
		<td>28</td> <td>Ъ</td>
		<td>32</td> <td>Ю</td>
	</tr>
</table>
<p>Введите пароль для входа в систему:</p>
<p class="error-holder">Пароль неверен! Попробуйте еще раз.</p>
<p class="success-holder">Все верно!</p>
<div class="password-holder-area">
	<input id="password-holder" type="password" placeholder="Пароль..."/>
	<button class="level-1-validate-btn">Войти</button>
</div>
<div class="success-holder-area">
		<button class="level-2-btn">Перейти к работе с системой</button>
</div>`,
	robotsArea: 'block',
	displayInstructions: 'block',
	instructions: `	<h2 class="instructions-title">Инструкции по выполнению</h2>
	<p>Шифр Цезаря - один из самых простых и наиболее известных методов шифрования, названный в честь римского полководца
		Гая Юлия Цезаря, использовавшего его для  секретной переписки со своими генералами.
	</p>
	<p>Рассмотрим пример шифрования со сдвигом на 3 элемента. Сдвиг на 3 элемента означает, что каждая буква исходного слова "сдвигается"
		на 3 буквы вперёд. Например, буква "А" становится буквой "Г", а буква "Е" становится буквой "З". 
	</p>
	<p>Например, зашифруем приведенную ниже фразу шифром Цезаря со сдвигом на 3</p>
	<h2 class="encrypted-text">Съешь же ещё этих мягких французских булок, да выпей чаю.</h2>
	<p>Заменив каждую букву соответствующей "сдвинутой" буквой, получим следующую фразу:</p>
	<h2 class="encrypted-text">Фэзыя йз зьи ахлш пвёнлш чугрщцкфнлш дцосн, жг еютзм ъгб.</h2>
	<button class="close-modal-screen">Закрыть</button>`,
	setListeners() {

		$('.close-modal-screen').click(event => {
			$('.modal-screen').hide('swing');
			$('#blur').hide();
		});

		$('.level-1-validate-btn').click(event => {
			if ($('#password-holder').val().toLowerCase() != 'навуходоносор') {
				$('.error-holder').show('swing');
				setTimeout(() => $('.error-holder').hide('swing'), 4000);
				return;
			}
			$('.password-holder-area').hide('swing');
			$('.success-holder').show('swing');
			setTimeout(() => $('.success-holder').hide('swing'), 4000);
			$('.success-holder-area').show('swing');
			$('.level-2-btn').click(event => {
				changeLevel(level_2);

				// Move robots
				$('#robots-background').css('background', 'url("images/ship/ship-02.png") no-repeat');
				moveRobots(8, 12, 28);
			});
		});
	},
}

export const level_2 = {
	levelName: 'Уровень 2. Булева логика',
	levelDescription: `		<p>Похоже, что панель управления функционирует неверно - необходимо проверить, правильно ли работает микропроцессорная логика.
	Для этого требуется составить таблицу истинности для логической схемы, приведенной ниже:
</p>
<img src="images/scheme.jpg" alt="scheme" style="display: block; margin: 0 auto;"/>
<table class="alphabet">
	<tr>
		<td>№</td>
		<td>A</td>
		<td>B</td>
		<td>F(A,B)</td>
	</tr>
	<tr>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td><input type="text" placeholder="0" maxlength="1" class="truth-table value-1"/></td>
	</tr>
	<tr>
			<td>1</td>
			<td>0</td>
			<td>0</td>
			<td><input type="text" placeholder="0" maxlength="1" class="truth-table value-2"/></td>
	</tr>
	<tr>
			<td>2</td>
			<td>0</td>
			<td>0</td>
			<td><input type="text" placeholder="0" maxlength="1" class="truth-table value-3"/></td>
	</tr>
	<tr>
			<td>3</td>
			<td>0</td>
			<td>0</td>
			<td><input type="text" maxlength="1" placeholder="0" class="truth-table value-4"/></td>
	</tr>
</table>
<p class="success-holder">Все верно!</p>
<div class="success-holder-area">
		<button class="level-3-btn">Следующий уровень</button>
</div>
<div class="check-area">
	<p class="error-holder">Проверьте свои вычисления еще раз!</p>
	<button class="level-2-validate-btn">Проверить</button>
</div>`,
	robotsArea: 'block',
	displayInstructions: 'block',
	instructions: `	<h2 class="instructions-title">Инструкции по выполнению</h2>
	<p>Алгебра логики - это раздел математики, изучающий высказывания,
		рассматриваемые со стороны их логических значений
		(истинности или ложности) и логических операций над ними.
		Алгебра логики позволяет закодировать любые утверждения,
		истинность или ложность которых нужно доказать, а затем
		манипулировать ими подобно обычным числам в математике.
	</p>
	<p>
		Базовые элементы логических схем - это элементы И, ИЛИ и НЕ. Для того, чтобы
		продемонстрировать принцип работы этих элементов, ниже приведены их таблицы истинности,
		то есть таблицы, содержащие все возможные комбинации входных переменных и соответствующие им значения
		на выходе.
	</p>
	<img src="images/truth.png" alt="truth-tables" style="display: block; margin: 0 auto;" />
	<p>На схеме конъюнкция операция конъюнкции изображена прямоуголькником со знаком &, операция
		дизъюнкции - прямоугольником со знаком 1, а инверсия - прямоугольником с кругом на выходе.
	</p>
	<button class="close-modal-screen">Закрыть</button>
</div>`,
	setListeners() {
		
		$('.close-modal-screen').click(event => {
			$('.modal-screen').hide('swing');
			$('#blur').hide();
		});

		$('.value-1').on('keyup', event => {
			if ($('.value-1').val() != '0') {
				$('.value-1').addClass('wrong').removeClass('right');
			} else {
				$('.value-1').removeClass('wrong').addClass('right');
			}
		});
		$('.value-2').on('keyup', event => {
			if ($('.value-2').val() != '1') {
				$('.value-2').addClass('wrong');
			} else {
				$('.value-2').removeClass('wrong').addClass('right');
			}
		});
		$('.value-3').on('keyup', event => {
			if ($('.value-3').val() != '1') {
				$('.value-3').addClass('wrong');
			} else {
				$('.value-3').removeClass('wrong').addClass('right');
			}
		});
		$('.value-4').on('keyup', event => {
			if ($('.value-4').val() != '0') {
				$('.value-4').addClass('wrong');
			} else {
				$('.value-4').removeClass('wrong').addClass('right');
			}
		});

		$('.level-2-validate-btn').click(event => {
			let invalid = false;
			$('.truth-table').each(function(el) {
				if ($(this).hasClass('wrong') || !$(this).hasClass('right')) {
					$(this).css('border', '1px solid #FF0000');
					invalid = true;
					$('.error-holder').show('swing');
					setTimeout(() => $('.error-holder').hide('fade'), 4000);
				} else {
					$(this).css('border', 'none');
				}
			});

			if (!invalid) {
				$('.alphabet').hide('swing');
				$('.level-2-validate-btn').hide('swing');
				$('.success-holder').show('swin');
				$('.success-holder-area').show('swing');
			}
		});
	
		$('.level-3-btn').click(event => {
			changeLevel(level_3);

			// Move robots
			$('#robots-background').css('background', 'url("images/ship/ship-03.png") no-repeat');
			moveRobots(24, 28, 44);
		});
	}
}

export const level_3 = {
	levelName: 'Уровень 3. Системы счисления',
	levelDescription: `<p>Следующий этап диагностики систем корабля - проверить, насколько верны рассчитанные координаты. Но компьютер оперирует в системах счисления,
	не удобных для человека. Твоя задача - перевести следующие числа в десятичную систему счисления для удобства расчетов.
</p>
<div class="tasks-holder">
	<p class="task"><span>AF16<sub>16</sub> = </span> 
	<input type="text" class="numeral-system task-1" placeholder="Ответ..."/>
	</p>
	<p class="task"><span>356<sub>8</sub> = </span>
		<input type="text" class="numeral-system task-2" placeholder="Ответ..."/>
	</p>
	<p class="task"><span>101001<sub>2</sub> = </span>
		<input type="text" class="numeral-system task-3" placeholder="Ответ..."/>
	</p>
	<p class="task"><span>3021<sub>4</sub> = </span>
		<input type="text" class="numeral-system task-4" placeholder="Ответ..."/>
	</p>
</div>
<p class="success-holder">Все верно!</p>
<div class="success-holder-area">
		<button class="level-4-btn">Следующий уровень</button>
</div>
<div class="check-area">
	<p class="error-holder">Проверьте свои вычисления еще раз!</p>
	<button class="level-3-validate">Проверить</button>
</div>`,
	robotsArea: 'block',
	displayInstructions: 'block',
	instructions: `<h2 class="instructions-title">Инструкции по выполнению</h2>
	<p>Система счисления - это метод записи чисел с помощью письменных знаков.
	</p>
	<p>В компьютерной технике очень часто используется двоичная
		система счисления, а также системы счисления, с показателями,
		равными степеням двойки. Такую систему очень легко реализовать
		в электронике (полупроводниковые транзисторы и микросхемы),
		так как для неё требуется всего два устойчивых состояния
		(0 и 1).
	</p>
	<p>
		Для перевода числа из любой системы счисления в десятичную используется следующая формула:
	</p>
	<p>
	<img src="images/numeral_formula.svg" style="background: #FFF" alt="formula"/>
	</p>
	<p>Рассмотрим следующие примеры:</p>
		<p>
		<img src="images/numeral_examples.svg" style="background: #FFF" alt="examples" /> 
		</p>
		<p>
		<img src="images/numeral_examples-1.svg" style="background: #FFF" alt="examples" />
		</p>
		<p>
		<img src="images/numeral_examples-3.svg" style="background: #FFF" alt="examples" />
		</p>
		<p>
		<img src="images/numeral_examples-4.svg" style="background: #FFF" alt="examples" />
		</p>
	</p>
	<button class="close-modal-screen">Закрыть</button>`,
	setListeners() {
		$('.close-modal-screen').click(event => {
			$('.modal-screen').hide('swing');
			$('#blur').hide();
		});

		$('.task-1').keyup(function (event) {
			if ($(this).val() != '44822') {
				$(this).addClass('wrong').removeClass('right');
			} else {
				$(this).removeClass('wrong').addClass('right');
			}
		});

		$('.task-2').keyup(function (event) {
			if ($(this).val() != '238') {
				$(this).addClass('wrong').removeClass('right');
			} else {
				$(this).removeClass('wrong').addClass('right');
			}
		});

		$('.task-3').keyup(function (event) {
			if ($(this).val() != '41') {
				$(this).addClass('wrong').removeClass('right');
			} else {
				$(this).removeClass('wrong').addClass('right');
			}
		});

		$('.task-4').keyup(function (event) {
			if ($(this).val() != '201') {
				$(this).addClass('wrong').removeClass('right');
			} else {
				$(this).removeClass('wrong').addClass('right');
			}
		});

		$('.level-3-validate').click(function (event) {
			let invalid = false;
			$('.numeral-system').each(function (el) {
				if ($(this).hasClass('wrong') || !$(this).hasClass('right')) {
					$(this).css('border', '1px solid #FF0000');
					invalid = true;
					$('.error-holder').show('swing');
					setTimeout(() => $('.error-holder').hide('fade'), 4000);
				} else {
					$(this).css('border', 'none');
				}
			});

			if (!invalid) {
				$('.tasks-holder').hide('swing');
				$('.level-3-validate').hide('swing');
				$('.success-holder').show('swin');
				$('.success-holder-area').show('swing');
			}
		});

		$('.level-4-btn').click(function (event) {
			changeLevel(level_4);
			$('#robots-background').css('background', 'url("images/ship/ship-04.png") no-repeat');
			moveRobots(40, 44, 57);
		});
	}
}

export const level_4 = {
	levelName: 'Уровень 4. Компьютерные сети',
	levelDescription: `<p>Для коммуникации со следующим отсеком необходимо вручную вычислить IP-адрес сети, если известен IP-адрес одного из узлов:</p>
	<h2 style="text-align: center" class="encrypted-text">145.92.137.88,</h2>
	<p> а также маска подсети:</p>
	<h2 style="text-align: center" class="encrypted-text">255.255.240.0</h2>
	<div class="success-holder-area">
	<p class="success-holder">Все верно!</p>
	<button class="level-5-btn">Следующий уровень</button>
	</div>
	<div class="check-area">
	<p class="error-holder">Проверьте свои вычисления еще раз!</p>
	<input placeholder="Ответ..." class="address" type="text" />
	<button class="level-4-validate">Проверить</button>
	</div>
	`,
	robotsArea: 'block',
	displayInstructions: 'block',
	instructions: `
	<h2 class="instructions-title">Инструкции по выполнению</h2>
	<p>
		IP - уникальный сетевой адрес узла в компьютерной сети, представляемый в виде 32-битного числа.  Он вычисляется по формуле:
	</p>
	<p class="encrypted-text">IP = адрес сети + номер компьютера в сети</p>
	<p>Для вычисления адреса сети по маске подсети и адресу узла необходимо выполнить поразрядную конъюнкцию адреса сети и маски.
	Например, для адреса узла 10.40.45.48 и маски 255.255.255.0 адрес сети имеет вид 10.40.45.0.
	</p>
	<button class="close-modal-screen">Закрыть</button>
	`,
	setListeners() {
		$('.close-modal-screen').click(event => {
			$('.modal-screen').hide('swing');
			$('#blur').hide();
		});

		$('.level-4-validate').click(function (event) {

			if ($('.address').val() != '145.92.128.0') {			
				$(this).css('border', '1px solid #FF0000');
				$('.error-holder').show('swing');
				setTimeout(() => $('.error-holder').hide('fade'), 4000);
			} else {
				$('.address').hide('swing');
				$('.level-4-validate').hide('swing');
				$('.success-holder').show('swin');
				$('.success-holder-area').show('swing');
			}
		});

		$('.level-5-btn').click(function (event) {
			changeLevel(level_5);
			$('#robots-background').css('background', 'url("images/ship/ship-05.png") no-repeat');
			moveRobots(53, 57, 72);
		})
	},
};

export const level_5 = {
	levelName: 'Уровень 5. Комбинаторика',
	levelDescription: `<p>Пароль к двери следующего отсека невозможно получить ни в явном, ни в зашифрованном виде. 
	Придется обратиться за помощью к мощному компьютеру, на вход которого нужно подать количество возможных вариантов паролей.
	Известно, что в пароле 6 символов, состоящих из букв русского алфавита и цифр от 1 до 9.</p>
	<div class="success-holder-area">
	<p class="success-holder">Все верно!</p>
	<button class="level-6-btn">Следующий уровень</button>
	</div>
	<div class="check-area">
	<p class="error-holder">Проверьте свои вычисления еще раз!</p>
	<input placeholder="Ответ..." class="comb" type="text" />
	<button class="level-5-validate">Проверить</button>
	</div>`,
	robotsArea: 'block',
	displayInstructions: 'block',
	instructions: `
	<h2 class="instructions-title">Инструкции по выполнению</h2>
	<p>
		В комбинаторике различают следующие конфигурации:
	</p>
	<p>
		Размещение - упорядоченный набор из k различных элементов, содержащий элементы множества из n элементов. 
		Пусть дано следующее множество: { 1, 2, 3, 4, 5, 6}. Необходимо определить, сколько трехзначных чисел можно составить из данных цифр.
		Если цифры не могут повторяться, то количество размещений вычисляется по следующей формуле (k = 3, n = 6):
	</p>
	<p><img style="background: #FFF" src="images/comb-1.svg" alt="formula-1" /></p>
	<p>Если цифры могут повторяться, то количество размещений вычисляется по следующей формуле:</p>
	<p><img style="background: #FFF" src="images/comb-2.svg" alt="formula-2" /></p>
	<p>Сочетание - неупорядоченный набор k элементов, выбранных из данного множества из n элементов. 
	Допустим, что из группы из 27 студентов нужно выбрать 3 дежурных. Тогда количество сочетаний вычислим по следующей формуле (k = 3, n = 27):</p>
	<p><img style="background: #FFF" src="images/comb-3.svg" alt="formula-3" /></p>
	<button class="close-modal-screen">Закрыть</button>
	`,
	setListeners() {
		$('.close-modal-screen').click(event => {
			$('.modal-screen').hide('swing');
			$('#blur').hide();
		});

		$('.level-5-validate').click(function (event) {
			if ($('.comb').val() != '6321363049') {
				$(this).css('border', '1px solid #FF0000');
				$('.error-holder').show('swing');
				setTimeout(() => $('.error-holder').hide('fade'), 4000);
			} else {
				$('.comb').hide('swing');
				$('.level-5-validate').hide('swing');
				$('.success-holder').show('swin');
				$('.success-holder-area').show('swing');
			}
		});

		$('.level-6-btn').click(function (event) {
			changeLevel(final_screen);
			$('#robots-background').css('background', 'url("images/ship/ship-06.png") no-repeat');
			moveRobots(68, 72, 83);			
		});
	},
}

export const final_screen = {
	levelName: 'Финал',
	levelDescription: `
	<p>Отличная работа! Благодаря твоей помощи, команда была успешно спасена, а корабль продержался до прибытия спасательной группы. 
	</p>
	<p>Надеюсь, что тебе было интересно, ты научился чему-то новому, и в дальнейшем продолжишь изучать информатику.</p>
	`,
	robotsArea: 'block',
	displayInstructions: 'none',
	setListeners() {
		
	},
}