import { changeLevel, entry_level, level_3, level_4, level_5, final_screen } from './levels.js';

changeLevel(level_5);

$('.instructions-p').click(event => {		
	$('#level-instructions').show({
		duration: 500,
		easing: 'swing',
	});
	$('#blur').show();
});
