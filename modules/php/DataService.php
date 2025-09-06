<?php

namespace Bga\Games\MaquisGame;

require_once("constants.inc.php");

class DataService {
    public static function setupRoundData(): string {
        return '
            INSERT INTO round_data (morale, active_resistance, resistance_to_recruit, milice_in_game)
            VALUES
            (6, 3, 2, 5);
        ';
    }

    public static function setupBoard(): string {
        return '
            INSERT INTO board (space_id, space_name, is_safe, is_field)
            VALUES
            (1, "Rue Baradat", FALSE, FALSE),
            (2, "Fence", FALSE, FALSE),
            (3, "Pont du Nord", FALSE, FALSE),
            (4, "Radio B", FALSE, FALSE),
            (5, "Doctor", FALSE, FALSE),
            (6, "Poor District", FALSE, FALSE),
            (7, "Black Market", FALSE, FALSE),
            (8, "Spare Room", FALSE, FALSE),
            (9, "Radio A", FALSE, FALSE),
            (10, "Spare Room", FALSE, FALSE),
            (11, "Pont Leveque", FALSE, FALSE),
            (12, "Grocer", FALSE, FALSE),
            (13, "Spare Room", FALSE, FALSE),
            (14, "Field", FALSE, TRUE),
            (15, "Cafe", FALSE, FALSE),
            (16, "Safe House", TRUE, FALSE),
            (17, "Field", FALSE, TRUE);
        ';
    }

    public static function setupActions(): string {
        return '
            INSERT INTO action (action_id, action_name, action_description, is_safe)
            VALUES
            (1, "' . ACTION_GET_WEAPON . '", "Pay 1 money to gain 1 weapon", FALSE),
            (2, "' . ACTION_GET_INTEL . '", "Gain 1 intel", FALSE),
            (3, "' . ACTION_AIRDROP . '", "Airdop supplies onto an empty field", FALSE),
            (4, "' . ACTION_GET_MEDICINE . '", "Gain 1 medicine", FALSE),
            (5, "' . ACTION_PAY_FOR_MORALE . '", "Pay 1 food and 1 medicine to gain 1 morale", TRUE),
            (6, "' . ACTION_GET_MONEY_FOR_FOOD . '", "Pay 1 food to gain 1 money and lose 1 morale", FALSE),
            (7, "' . ACTION_GET_SPARE_ROOM . '", "Pay 2 money to gain a spare room", TRUE),
            (8, "' . ACTION_GET_FOOD . '", "Gain 1 food", FALSE),
            (9, "' . ACTION_GET_WORKER . '", "Pay 1 food to gain 1 worker", FALSE),
            (10, "' . ACTION_GET_MONEY_FOR_MEDICINE . '", "Pay 1 medicine to gain 1 money and lose 1 morale", FALSE),
            (11, "' . ACTION_COLLECT_ITEMS . '", "Collect items", FALSE),
            (12, "' . ACTION_WRITE_GRAFFITI . '", "Write anti-fascist graffiti", FALSE),
            (13, "' . ACTION_COMPLETE_OFFICERS_MANSION_MISSION . '", "Complete Mission", TRUE),
            (14, "' . ACTION_COMPLETE_MILICE_PARADE_DAY_MISSION . '", "Complete Mission", TRUE),
            (15, "' . ACTION_GET_MONEY . '", "Gain 1 money", FALSE),
            (16, "' . ACTION_GET_EXPLOSIVES . '", "Pay 1 medicine to gain 1 explosives", FALSE),
            (17, "' . ACTION_GET_3_FOOD . '", "Gain 3 food", FALSE),
            (18, "' . ACTION_GET_3_MEDICINE . '", "Gain 3 medicine", FALSE),
            (19, "' . ACTION_INCREASE_MORALE . '", "Increase morale by 1", TRUE),
            (20, "' . ACTION_GET_POISON . '", "Pay 2 medicine to gain 1 poison", FALSE),
            (21, "' . ACTION_GET_FAKE_ID . '", "Pay 1 money and 2 intel to gain 1 fake id", FALSE),
            (22, "' . ACTION_INFILTRATE_FACTORY . '", "Infiltrate Factory", TRUE),
            (23, "' . ACTION_SABOTAGE_FACTORY . '", "Sabotage Factory", TRUE),
            (24, "' . ACTION_DELIVER_INTEL . '", "Deliver 2 Intel", TRUE),
            (25, "' . ACTION_INSERT_MOLE . '", "Insert Mole", TRUE),
            (26, "' . ACTION_RECOVER_MOLE . '", "Recover mole and complete mission", TRUE),
            (27, "' . ACTION_POISON_SHEPARDS . '", "Poison Shepards", TRUE),
            (28, "' . ACTION_SEEK_DOUBLE_AGENT . '", "Seek Double Agent", TRUE),
            (29, "' . ACTION_COMPLETE_DOUBLE_AGENT_MISSION . '", "Complete the mission", TRUE);
        ';
    }

    public static function setupBoardActions(): string {
        return '
            INSERT INTO board_action (space_id, action_id)
            VALUES
            (2, 1),
            (4, 2),(4, 3),
            (5, 4),
            (6, 5),
            (7, 6), (7, 10),
            (8, 7),
            (9, 2),(9, 3),
            (10, 7),
            (12, 8),
            (13, 7),
            (14, 11),
            (15, 9),
            (17, 11);
        ';
    }

    public static function setupBoardPaths(): string {
        return '
            INSERT INTO board_path (space_id_start, space_id_end)
            VALUES
            (1, 2),
            (1, 5),

            (2, 1),
            (2, 6),

            (3, 6),
            (3, 7),

            (4, 7),
            (4, 8),

            (5, 1),
            (5, 9),
            (5, 10),
            (5, 11),

            (6, 2),
            (6, 3),
            (6, 7),
            (6, 11),

            (7, 3),
            (7, 4),
            (7, 6),
            (7, 8),
            (7, 12),

            (8, 4),
            (8, 7),

            (9, 5),
            (9, 10),

            (10, 5),
            (10, 9),

            (11, 5),
            (11, 6),
            (11, 16),

            (12, 7),
            (12, 13),
            (12, 16),

            (13, 12),

            (14, 15),

            (15, 14),
            (15, 16),

            (16, 11),
            (16, 12),
            (16, 15),
            (16, 17),

            (17, 16);
        ';
    }

    public static function setupResources(): string {
        return '
            INSERT INTO resource (resource_name)
            VALUES
            ("' . RESOURCE_FOOD . '"),
            ("' . RESOURCE_MEDICINE . '"),
            ("' . RESOURCE_MONEY . '"),
            ("' . RESOURCE_EXPLOSIVES . '"),
            ("' . RESOURCE_WEAPON . '"),
            ("' . RESOURCE_INTEL . '"),
            ("' . RESOURCE_POISON . '"),
            ("' . RESOURCE_FAKE_ID . '");
        ';
    }

    public static function setupMissions(): string {
        return '
            INSERT INTO mission (mission_name)
            VALUES
            ("' . MISSION_MILICE_PARADE_DAY . '"),
            ("' . MISSION_OFFICERS_MANSION . '"),
            ("' . MISSION_SABOTAGE . '"),
            ("' . MISSION_UNDERGROUND_NEWSPAPER . '"),
            ("' . MISSION_INFILTRATION . '"),
            ("' . MISSION_GERMAN_SHEPARDS . '"),
            ("' . MISSION_DOUBLE_AGENT . '");
        ';
    }

    public static function setupRooms(): string {
        return '
            INSERT INTO room (room_name)
            VALUES
            ("' . ROOM_INFORMANT . '"),
            ("' . ROOM_COUNTERFEITER . '"),
            ("' . ROOM_SAFE_HOUSE . '"),
            ("' . ROOM_CHEMISTS_LAB . '"),
            ("' . ROOM_SMUGGLER . '"),
            ("' . ROOM_PROPAGANDIST . '");
        ';
    }
}